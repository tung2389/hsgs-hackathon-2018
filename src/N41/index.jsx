import React from "react";
import Sudoku from "./lib/arroku.js";
import "./index.less";

let lang = "VN";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: lang === "VN" ? false : true };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(function(prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
    lang = this.state.isToggleOn ? "VN" : "EN";
  }

  render() {
    const board = this.props.state.board;
    const arrow = this.props.state.arrow;
    const len = board.length;
    const small_len = Math.sqrt(len);
    const err = this.props.error ? this.props.error.message : null;
    let error = [];
    // Handle string in multi-languages
    if (err !== null) {
      let err_return = null;
      switch (err) {
        case "invalid":
          err_return =
            lang === "VN" ? "Bước đi không hợp lệ!" : "Invalid Move!";
          break;
        default:
          null;
      }
      error.push(JSON.stringify(err_return));
    }

    const array = [];
    for (let j = 0; j < len; ++j) {
      let subarray = [];
      for (let i = 0; i < len; ++i)
        subarray.push(
          <input
            value={
              !board[i][j] || board[i][j] > len ? "" : Math.abs(board[i][j])
            }
            key={"item" + i + j}
            className={
              "square" + (arrow[i][j] ? " square-arrow" + arrow[i][j] : "")
            }
            disabled={this.props.isEnding === "won" ? true : board[i][j] < 0}
            min={1}
            max={len}
            style={{
              fontSize: "16px",
              color: board[i][j] > 0 ? "#ff1493" : "#000",
              borderLeft: "#000 solid " + (i === 0 ? "4px" : "1px"),
              borderRight:
                "#000 solid " + ((i + 1) % small_len === 0 ? "4px" : "1px"),
              borderTop: "#000 solid " + (j === 0 ? "4px" : "1px"),
              borderBottom:
                "#000 solid " + ((j + 1) % small_len === 0 ? "4px" : "1px")
            }}
            onChange={event =>
              this.props.Place({
                x: i,
                y: j,
                val: parseInt(event.target.value)
              })
            }
          />
        );
      array.push(
        <div className="board-row" key={"line" + j}>
          {subarray}
        </div>
      );
    }

    let space = [];
    for (let i = 5; i-- > 0; ) space.push(<br key={"br" + i} />);
    return (
      <div className="n41">
        <h1 style={{ float: "left" }}>
          {lang === "VN"
            ? "Phần thưởng dành cho Miroslav"
            : "A Prize For Miroslav"}
        </h1>

        <label
          style={{ float: "left", marginLeft: "10px", marginTop: "20px" }}
          className="btn"
          onClick={this.handleClick}
        >
          {lang === "VN" ? "English" : "Tiếng Việt"}
        </label>

        <label
          style={{ float: "left", marginLeft: "10px", marginTop: "20px" }}
          className="btn"
          htmlFor="modal-1"
        >
          {lang === "VN" ? "Hướng dẫn chơi" : "How To Play?"}
        </label>

        <label
          style={{ float: "left", marginLeft: "10px", marginTop: "20px" }}
          className="btn"
          onClick={this.props.Reset}
        >
          {lang === "VN" ? "Đặt lại" : "Reset"}
        </label>

        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal">
          <label className="modal__bg" htmlFor="modal-1" />
          <div className="modal__inner">
            <label className="modal__close" htmlFor="modal-1" />
            <h1>Cốt truyện</h1>
            <p>
              &nbsp;&nbsp;Sức mạnh hình thể của Illaoi chẳng là gì so với đức
              tin mãnh liệt của bà. Là nhà tiên tri của Thủy Thần Vĩ Đại, bà sử
              dụng một tượng thần khổng lồ bằng vàng để lôi linh hồn kẻ địch ra
              khỏi thể xác và đập tan nhận thức của chúng về thực tại. Mọi kẻ
              dám thách thức “Người Nắm Giữ Chân Lý Của Nagakabouros” nhanh
              chóng khám phá ra bà không bao giờ chiến đấu một mình – vị thần
              của Quần Đảo Mãng Xà luôn ở bên bà.
            </p>
            <p>
              &nbsp;&nbsp;Những ai gặp Illaoi đều kinh ngạc trước ngoại hình của
              bà. Một phụ nữ mạnh mẽ, một nữ tu dành hết thời gian để trải
              nghiệm cuộc sống. Bà lấy đi những gì mình muốn, tiêu diệt những gì
              mình ghét, và tận hưởng những gì mình thích
            </p>
            <p>
              &nbsp;&nbsp;Tuy nhiên, để thực sự biết Illaoi bạn phải hiểu được
              tôn giáo bà đã nguyện dâng hiến cả cuộc đời. Nagakabouros, vị thần
              trong tín ngưỡng của bà, thường được miêu tả như một sinh vật đầu
              mãng xà với xúc tu cuộn xoắn xung quanh, chuyển động không có điểm
              bắt đầu cũng không có điểm kết thúc. Còn được gọi là Mẹ Rắn, Thủy
              Thần Vĩ Đại, hoặc thậm chí là Quý Bà Râu, Nagakabouros là vị thần
              của sự sống, bão tố, và chuyển động. (Tên của thần được dịch theo
              nghĩa đen là “quái vật bất tận đi khắp biển và trời.”) Cột trụ của
              giáo lý nằm ở ba điều: mọi linh hồn được sinh ra để phục vụ cho vũ
              trụ; vũ trụ đưa khát khao vào trong mọi thể sống; vũ trụ chỉ tiếp
              tục vận hành khi các sinh vật theo đuổi khát khao của mình.
            </p>
            <p>
              &nbsp;&nbsp;Các nữ tu dưới quyền được giao nhiệm vụ chăm sóc điện
              thờ, nuôi giữ bầy rắn thần, và chỉ dạy mọi người con đường của
              Nagakabouros. Là Người Nắm Giữ Chân Lý của thần giáo, vai trò của
              Illaoi là trực tiếp phục vụ bằng việc khơi thông dòng chảy của vũ
              trụ. Để làm được điều đó , bà có hai trách nhiệm thiêng liêng.
            </p>
            <p>
              &nbsp;&nbsp;Nhiệm vụ đầu tiên của Người Nắm Giữ Chân Lý là trở
              thành tiên phong trong cuộc chiến chống tử linh sinh vật. Nằm
              ngoài dòng chảy thông thường của vũ trụ, chúng bị coi là một thứ
              ghê tởm chống lại Nagakabouros. Dù trách nhiệm của mọi Nữ Tu Thủy
              Thần là bảo vệ dân bản xứ khỏi Đêm Thống Khổ, một Người Nắm Giữ
              Chân Lý phải trực tiếp đối đầu với những hồn ma mạnh mẽ nhất và
              xua tan Màn Sương Đen.
            </p>
            <p>
              &nbsp;&nbsp;Thứ hai, Illaoi tìm kiếm những cá nhân tiềm năng và
              kiểm tra họ bằng Thử Thách Của Nagakabouros. Đây chính là gánh
              nặng của Illaoi khi nắm giữ danh hiệu cao quý của thần giáo. Với
              thánh vật khổng lồ, Mắt Thần Linh, Người Nắm Giữ Chân Lý kéo linh
              hồn những người được thử thách khỏi thể xác rồi bắt họ đứng trước
              bà để chứng tỏ giá trị bản thân. Bà làm thế dù biết kẻ thất bại sẽ
              hoàn toàn tiêu vong, vì Thủy Thần Vĩ Đại không có chút khoan dung
              với sự hèn nhát, nghi ngờ, hay áp đặt. Nhưng hủy diệt không phải
              mục đích của thần linh. Người sống sót sau thử thách sẽ mãi mãi
              thay đổi và thường sẽ có được ý chí để theo đuổi định mệnh thực sự
              của mình.
            </p>
            <p>
              &nbsp;&nbsp;Dù là Người Nắm Giữ Chân Lý mạnh mẽ và đáng kính nhất
              trong cả trăm thế hệ, Illaoi cũng là người đầu tiên phá vỡ truyền
              thống. Sau khi được truyền dạy để trở thành Người Nắm Giữ Chân Lý,
              sau khi sức mạnh đạt đỉnh cao, Illaoi rời những thần điện bằng
              vàng ở Buhru để tới khu tồi tàn đổ nát gần Bilgewater.
            </p>
            <p>
              &nbsp;&nbsp;Thành phố cướp biển là địa điểm duy nhất ở Quần Đảo
              Mãng Xà những kẻ ngoại lai được phép đặt chân đến, và bị người của
              Illaoi coi là một chốn bẩn thỉu hôi hám. Người Nắm Giữ Chân Lý
              tiền nhiệm đã lờ nơi này đi, cho rằng tốt nhất là không nên đụng
              chạm gì với đám người từ nơi khác đến. Illaoi phá vỡ truyền thống
              khi chọn bảo vệ cư dân Bilgewater khỏi Đêm Thống Khổ, hoặc thậm
              chí còn gây tranh cãi hơn khi quyết định rằng một vài trong số họ
              sở hữu linh hồn xứng đáng với thử thách vĩ đại. Dù vậy, số thần
              điện trong thành phố cũng chỉ đếm trên đầu ngón tay, và chỉ có rất
              ít paylangi (tiếng lóng trên đảo để chỉ người có gốc đất liền)
              được phép vào trong. Bất chấp việc đó, chính Illaoi là người đã
              truyền bá nhận thức về Mẹ Rắn tới Bilgewater, và chính tinh thần
              bất khuất của bà đã khiến thần giáo phát triển tại đây.
            </p>
            <p>
              &nbsp;&nbsp;Lan truyền đây đó những tin đồn rằng trái tim tên cướp
              biển khát máu và nổi tiếng nhất Bilgewater đã tan nát trước vị nữ
              tu cao lớn. Bất kỳ ai từng gặp bà cũng sẽ không thấy ngạc nhiên.
              Ẩn dưới dáng vẻ thô lỗ của Illaoi là trí tuệ, sức mạnh, và một sự
              tự tin đầy thu hút.
            </p>
            <p>
              &nbsp;&nbsp;Nhiều người mong giành được thiện ý của Illaoi và chào
              đón bà tới Bilgewater… nhưng ai cũng sợ bị thử thách bởi Nữ Tu
              Thủy Thần.
            </p>
            <p>&nbsp;&nbsp;“Không thể ngơi nghỉ. Chúng ta là chuyển động.”</p>
            <p>&nbsp;&nbsp;—Trích trong Hai Mươi Lời Răn Của Nagakabouros</p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Illaoi. Nhiệm vụ của bạn chỉ là giúp
              Miroslav giải bảng arrowku và chứng minh cho thầy dạy lái xe Anton
              Cork về độ khủng của anh ấy.
            </p>
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Arrowku giống như sudoku, là trò chơi trên bảng n*n,
              nhiệm vụ của bạn là điền số vào bảng sao cho mỗi côt, mỗi hàng và
              mỗi ô vuông &#8730;n*&#8730;n đều có đủ các số từ 1 đến n. Ngoài
              ra, ở các ô có mũi tên sẽ phải nhỏ hơn số trong ô mà mũi tên chỉ
              vào.
            </p>
          </div>
        </div>

        {space}

        {/* Print as table */}
        <div style={{ float: "left" }}>{array}</div>

        <h1 style={{ color: "red" }} className="msg">
          {error}
        </h1>

        <h1 style={{ color: "green" }} className="msg">
          {this.props.isEnding === "won"
            ? lang === "VN"
              ? "Bạn đã thắng!"
              : "You Won!"
            : ""}
        </h1>

        <footer className="footer">
          <span> Made with ❤️ by </span>
          <a href="https://gitlab.com/dungwinux">dungwinux</a>
          <span>, </span>
          <a href="https://gitlab.com/kudotuanminh">kudotuanminh</a>
          <span>, </span>
          <a href="https://gitlab.com/DucPr0">DucPr0</a>
          <span>, </span>
          <a href="https://gitlab.com/xmen1404">xmen1404</a>
        </footer>
      </div>
    );
  }
}

export default Board;
