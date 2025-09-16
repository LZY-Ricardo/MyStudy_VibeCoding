import React, { Component, createRef } from 'react'

const getData = async () => {
    const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
        }, 1000)
    })
    return res
}

export default class CountClass extends Component {
    constructor(props) {
        console.log(props);
        super()
        this.state = {
            count: props.val
        }
        this.titleRef = createRef()
        // getData().then(res => {
        //     this.setState({
        //         count: res
        //     })
        // })
    }

    // getDerivedStateFromProps() { // 无法使用 是 React内部的函数
    //     console.log('getDerivedStateFromProps');
    // }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(this.titleRef.current);
        getData().then(res => {
            this.setState({
                count: res
            })
        })
    }

    // shouldComponentUpdate() {
    //     console.log('shouldComponentUpdate');
    //     return false
    // }


    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        console.log('render');
        return (
            <div>
                <h1 ref={this.titleRef}>类组件当前计数：{this.state.count}</h1>
                <button onClick={this.handleAdd.bind(this)}>增加</button>
            </div>
        )
    }
}
