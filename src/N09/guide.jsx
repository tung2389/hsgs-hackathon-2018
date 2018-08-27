import React from "react";

class Guide extends React.Component {
    render() {
        return(
            <body>
                <h1> Hướng dẫn sử dụng game <i>Chikapu và các con số</i> </h1>

                <p style={{ fontSize: "20px"}}>
                    Chikapu được giao một một tờ giấy với các con số và Pikachu được cho biết rằng đây là một phép tính.<br/>
                    Nhiệm vụ của bạn là giúp Chikapu chọn dấu thích hợp vào các nút màu xanh chứa số để tạo ra một kết quả cho trước.
                    <ul>
                        <li>Có N phép tính.</li>
                    </ul>
                    Hướng dẫn cách chơi:
                    <ul>
                        <li>Đầu tiên, bạn cần nhấn vào các nút màu xanh để hiện dấu phép tính.</li>
                        <li>Sau đó, dấu sẽ theo thứ tự lần lượt là cộng(+), trừ(-), nhân(x), chia(/), cộng(+), trừ(-), nhân(x),...</li>
                        <li>Sau khi bạn có một phép tính tạo ra kết quả đã cho thì sẽ có thông báo là bạn đã hoàn thành trò chơi.</li>
                    </ul>
                </p>
            </body>
        );
    }
}

export default Guide;