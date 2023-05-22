import {Spin} from "antd"
import ReactDOM from "react-dom"

// 当前正在请求的数量
let requestCount = 0

// 显示loading
export function showLoading() {
    if (requestCount === 0) {
        var dom = document.createElement('div')
        dom.setAttribute('id', 'loading')
        dom.style.cssText  = 'position:absolute;bottom:0;top:0;left:0;right:0';
        document.body.appendChild(dom)
        ReactDOM.render(<Spin tip="加载中..." size = "large"  style={{position:"relative",top:"50%",left:"50%"}}/>, dom)
    }
    requestCount++
}

// 隐藏loading
export function hideLoading() {
    requestCount--
    console.log("🐺 ~ file: loading.tsx:27 ~ hideLoading ~ requestCount:", requestCount)

    if (requestCount === 0) {
        document.body.removeChild(document.getElementById('loading') as HTMLElement )
    }
}
