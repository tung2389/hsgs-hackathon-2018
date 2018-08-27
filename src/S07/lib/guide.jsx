import React from "react";
import "../index.less";

class Guide extends React.Component {
  render() {
    return (
      <div className="s07">
        <h1>Tutorial</h1>
        <div>
          <p>
            Trước mặt bạn là 1 lưới bao gồm những ô vuông, click những ô vuông
            sẽ thay đổi nó thành những con số/dấu tùy vào vị trí của nó.
            <br />
            Mục tiêu: Thay đổi giá trị trong các ô vuông để tạo thành một biểu
            thức hợp lý theo cả hàng ngang và hàng dọc
            <br />
            <br />
            Ví dụ về một bảng hợp lệ có thể thấy tại hình ảnh bên dưới
          </p>
        </div>
        <img src="https://i.imgur.com/1Q36ADj.png" />
        <div>
          <p>Bên dưới bảng là 2 nút tùy chọn</p>
          <ul>
            <li>Reset: Xóa bỏ tất cả các thao tác bạn đã làm</li>
            <li>Hint: Sử dụng sự trợ giúp của game. Tối đa có 3 sự trợ giúp</li>
          </ul>
        </div>
        <div>
          <p>Nếu bạn định làm mức độ khó nhất, chúc bạn may mắn :)</p>
        </div>

        <div>
          <p>Game made by Banbeucmas (banbeucams@gmail.com)</p>
        </div>
      </div>
    );
  }
}

export default Guide;
