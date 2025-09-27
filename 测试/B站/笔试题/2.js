class Message extends React.Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0 // 当前显示的图片索引
        };
        // 图片列表（与题目提供的 URL 一致）
        this.images = [
            "https://static.nowcoder.com/ajax/img/react-Rotationchart/img/1.jpg",
            "https://static.nowcoder.com/ajax/img/react-Rotationchart/img/2.jpg",
            "https://static.nowcoder.com/ajax/img/react-Rotationchart/img/3.jpg",
            "https://static.nowcoder.com/ajax/img/react-Rotationchart/img/4.jpg"
        ];

        // 点击左右按钮的处理函数
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    // 处理向右按钮点击：切换到下一张，最后一张后回到第一张
    handleNextClick() {
        const { currentIndex } = this.state;
        const total = this.images.length;
        const nextIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;
        this.setState({ currentIndex: nextIndex });
    }

    // 处理向左按钮点击：切换到上一张，第一张前回到最后一张
    handlePrevClick() {
        const { currentIndex } = this.state;
        const total = this.images.length;
        const prevIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
        this.setState({ currentIndex: prevIndex });
    }

    render() {
        return (
            <React.Fragment>
                <div id="box">
                    {/* 动态渲染图片列表，根据 currentIndex 设置 active 类名 */}
                    <ul className="lists">
                        {this.images.map((src, index) => (
                            <li
                                key={index}
                                className={index === this.state.currentIndex ? 'active' : ''}
                                style={{ display: index === this.state.currentIndex ? "block" : "none" }}
                            >
                                <image src={src} alt="" />
                            </li>
                        ))}
                    </ul>
                    {/* 绑定左右按钮的点击事件 */}
                    <a
                        href="javascript:;"
                        className="prev_btn"
                        onClick={this.handlePrevClick}
                    />
                    <a
                        href="javascript:;"
                        className="next_btn"
                        onClick={this.handleNextClick}
                    />
                </div>
            </React.Fragment>
        );
    }
  }