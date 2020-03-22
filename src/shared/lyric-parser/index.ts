/**
 * [ti:晴天]
 * [ar:周杰伦]
 * [al:叶惠美]
 * [by:]
 * [offset:0]
 * [00:00.00]晴天 - 周杰伦 (Jay Chou)
 * [00:07.34]词：周杰伦
 * [00:14.69]曲：周杰伦
 * [00:22.04]编曲：周杰伦
 * [00:29.39]故事的小黄花
 * [00:32.64]从出生那年就飘着
 * [00:36.19]童年的荡秋千
 * [00:39.93]随记忆一直晃到现在
 * [00:42.99]Re So So Si Do Si La
 * [00:46.11]So La Si Si Si Si La Si La So
 * [00:49.79]吹着前奏望着天空
 * [00:53.35]我想起花瓣试着掉落
 * [00:56.78]为你翘课的那一天
 * [00:59.03]花落的那一天
 * [01:00.65]教室的那一间
 * [01:02.21]我怎么看不见
 * [01:04.02]消失的下雨天
 * [01:05.71]我好想再淋一遍
 * [01:09.08]
 * [01:09.95]没想到失去的勇气我还留着
 * [01:15.01]
 * [01:16.13]好想再问一遍
 * [01:17.87]你会等待还是离开
 * [01:23.18]
 * [01:24.74]刮风这天我试过握着你手
 * [01:30.42]但偏偏雨渐渐大到我看你不见
 * [01:37.66]
 * [01:38.84]还要多久我才能在你身边
 * [01:44.65]
 * [01:45.40]等到放晴的那天也许我会比较好一点
 * [01:52.76]从前从前有个人爱你很久
 * [01:58.50]但偏偏风渐渐把距离吹得好远
 * [02:05.86]
 * [02:06.74]好不容易又能再多爱一天
 * [02:13.35]但故事的最后你好像还是说了拜拜
 * [02:21.46]
 * [02:35.00]为你翘课的那一天
 * [02:36.75]花落的那一天
 * [02:38.63]教室的那一间
 * [02:40.31]我怎么看不见
 * [02:42.05]消失的下雨天
 * [02:43.74]我好想再淋一遍
 * [02:46.99]
 * [02:47.98]没想到失去的勇气我还留着
 * [02:53.60]
 * [02:54.53]好想再问一遍
 * [02:55.97]你会等待还是离开
 * [03:01.77]
 * [03:02.77]刮风这天我试过握着你手
 * [03:08.45]但偏偏雨渐渐大到我看你不见
 * [03:15.94]
 * [03:16.87]还要多久我才能在你身边
 * [03:23.49]等到放晴的那天也许我会比较好一点
 * [03:30.91]从前从前有个人爱你很久
 * [03:37.03]偏偏风渐渐把距离吹得好远
 * [03:43.89]
 * [03:44.77]好不容易又能再多爱一天
 * [03:50.38]
 * [03:51.07]但故事的最后你好像还是说了拜拜
 * [03:59.62]刮风这天我试过握着你手
 * [04:02.05]但偏偏雨渐渐大到我看你不见
 * [04:05.44]还要多久我才能够在你身边
 * [04:08.99]等到放晴那天也许我会比较好一点
 * [04:12.86]从前从前有个人爱你很久
 * [04:15.86]但偏偏雨渐渐把距离吹得好远
 * [04:19.29]好不容易又能再多爱一天
 * [04:22.79]但故事的最后你好像还是说了拜
 */

// 源码：https://github.com/ustbhuangyi/lyric-parser

type PlayState = 'PLAYING' | 'PAUSE';
type LyricHandler = (data: { lineNum: number; lyricText: string }) => void;

/**
 * 对于每行歌词，匹配结果是四个：整行歌词，分，秒，毫秒
 * 要点：() 是分组符，把项目拆分成若干个单元
 */
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const tagRegMap: { [key: string]: string } = {
  // 根据例子可知，[] 中除了时间还有特殊标签
  title: 'ti',
  artist: 'ar',
  album: 'al',
  offset: 'offset',
  by: 'by'
};

const noop = () => undefined; // dummy 函数

class LyricParser {
  private lyric: string; // 所有歌词
  private tags: { [key: string]: string }; // 映射标签与标签内容，{ ti: '晴天' }
  private lines: { time: number; lyricText: string }[]; // 我们需要的结构
  private handler: LyricHandler; // 用户定义的事件回调函数
  private state: PlayState; // 播放状态
  private curNum!: number; // 当前的播放歌词的索引
  private startStamp!: number; // 播放第一句歌词时的绝对时间
  private pauseStamp!: number; // 暂停播放时的绝对时间
  private timer!: NodeJS.Timeout;

  constructor(lyric: string, handler: LyricHandler = noop) {
    this.lyric = lyric;
    this.tags = {};
    this.lines = [];
    this.handler = handler;
    this.state = 'PAUSE';
    this.init();
  }

  /**
   * 播放歌词
   *
   * @param {number} startTime 开始播放时间（相对第一句歌词）
   * @param {boolean} skipLast 是否跳过播放上一句歌词
   * @returns {void}
   */
  public play(startTime: number = 0, skipLast?: boolean): void {
    if (!this.lines.length) {
      return;
    }
    this.state = 'PLAYING';
    this.curNum = this.findCurNum(startTime);
    // 由于 startTime 是相对时间，那么 startStamp 指的是播放第一句歌词的绝对时间戳
    this.startStamp = +new Date() - startTime;
    if (!skipLast) {
      this.callHandler(this.curNum - 1);
    }
    if (this.curNum < this.lines.length) {
      clearTimeout(this.timer);
      this.playRest();
    }
  }

  /**
   * 切换播放状态
   */
  public togglePlay(): void {
    const now = +new Date();
    if (this.state === 'PLAYING') {
      this.stop();
      this.pauseStamp = now;
    } else {
      this.state = 'PLAYING';
      this.play((this.pauseStamp || now) - (this.startStamp || now), true);
      this.pauseStamp = 0;
    }
  }

  /**
   * 暂停播放
   */
  public stop(): void {
    this.state = 'PAUSE';
    clearTimeout(this.timer);
  }

  /**
   * 跳至第 offset 行歌词
   *
   * @param {number} offset
   * @returns {void}
   */
  public seek(offset: number = 0): void {
    this.play(offset);
  }

  private init(): void {
    this.initTag();
    this.initLines();
  }

  private initTag(): void {
    for (const tag in tagRegMap) {
      if (tagRegMap.hasOwnProperty(tag)) {
        // 寻找整个歌词字符串中每个标签对应的内容
        const matches = this.lyric.match(
          new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)]`, 'i')
        );
        this.tags[tag] = (matches && matches[1]) || '';
      }
    }
  }

  private initLines(): void {
    const lines = this.lyric.split('\n');
    for (const line of lines) {
      const result = timeExp.exec(line);
      if (result) {
        const lyricText = line.replace(timeExp, '').trim();
        if (lyricText) {
          this.lines.push({
            time:
              +result[1] * 60 * 1000 +
              +result[2] * 1000 +
              (+result[3] || 0) * 10,
            lyricText
          });
        }
      }
    }
    this.lines.sort((a, b) => {
      // 按时间升序排序
      return a.time - b.time;
    });
  }

  /**
   * 根据时间点返回相应的歌词索引
   *
   * @param {number} time 相对第一句歌词的时间
   * @returns {number}
   */
  private findCurNum(time: number): number {
    for (let i = 0; i < this.lines.length; i++) {
      if (time <= this.lines[i].time) {
        return i;
      }
    }
    return this.lines.length - 1;
  }

  /**
   * 调用用户传入的事件函数
   *
   * @param {number} i 当前歌词索引
   * @returns {void}
   */
  private callHandler(i: number): void {
    if (i < 0) {
      return;
    }
    this.handler({ lineNum: i, lyricText: this.lines[i].lyricText });
  }

  private playRest(): void {
    const line = this.lines[this.curNum];
    const delay = line.time - (+new Date() - this.startStamp);
    this.timer = setTimeout(() => {
      this.callHandler(this.curNum++);
      if (this.curNum < this.lines.length && this.state === 'PLAYING') {
        this.playRest();
      }
    }, delay);
  }
}

export default LyricParser;
