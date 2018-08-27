import React from "react";

class Guide extends React.Component {
    render() {
        return(
            <body>
                <h1> Hướng dẫn sử dụng game <i>Pikachu với bảng số và màu</i></h1>

                <p style={{ fontSize: "20px"}}>
                	Pikachu được giao cho một bảng số với các ô màu.<br/>
                    Nhiệm vụ của bạn là giúp Pikachu điền vào bảng với các quy tắc sau:
                    <ul>
                        <li>Bảng có N hàng và N cột.</li>
                        <li>Mỗi hàng và mỗi cột phải có đủ N màu và N số từ 1 đến N.</li>
                        <li>Mỗi số được gắn N lần và gắn vào N ô có màu khác nhau.</li>
                    </ul>
                    Hướng dẫn cách chơi:
                    <ul>
                        <li>Những ô có viền đen và số màu vàng là những ô đã cho trước và không thể thay đổi.</li>
                        <li>Những ô có viền đen và số màu đen(sau khi gõ vào) là những ô chưa cho cả màu và số.
                            Để đổi màu của những ô này thì gõ một kí tự bất kì rồi xóa đi, lặp lại cho đến khi được màu bạn muốn
                            và điền giá trị số vào.</li>
                        <li>Những ô có viền xanh và số màu đen là những ô đã cho số và chưa cho màu,
                            nhấp vào cho đến khi được màu bạn muốn.</li>
                        <li>Những ô có viền xanh và số màu vàng(sau khi gõ vào) là những ô có màu nhưng chưa có số,
                            bạn chỉ cần nhập số vào các ô này.</li>
                        <li>Sau khi bạn điền xong và thỏa mãn tất cả các quy tắc thì sẽ có thông báo là bạn đã hoàn thành trò chơi.</li>
                    </ul>
                </p>
            </body>
        );
    }
}

export default Guide;