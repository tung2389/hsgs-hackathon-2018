import React from "react";
import "./guide.less"

class Guide extends React.Component {
    render() {
        return(
            <div className="n39">
                <div className="guide">
                    <h1> Hướng dẫn chơi </h1>

                    <span>
                    Cho một bảng ô vuông.
                    Ta cần xóa một số ô trên bảng sao cho ở <strong>mỗi hàng và mỗi cột không tồn tại hai số có giá trị bằng nhau. </strong>
                    Biết rằng các ô bị xóa không được đặt gần nhau kể cả theo <strong>chiều ngang hay dọc (tuy nhiên các ô bị xóa được phép chạm góc). </strong>
                    Các ô không bị xóa phải tạo thành <strong>một miền liên tục không ngắt quãng (hai ô chạm góc không được coi là một miền liên tục).</strong>
                    </span>
                    <br/>
                    <span>
                        Để xóa đi một ô hay để một ô từ trạng thái bị xóa sang trạng thái không bị xóa ta nhấp chuột vào ô đó.
                    </span>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Guide;