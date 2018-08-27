import React from "react";
import Maidel from "./lib/maidel.js";
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
    const size = board.length;
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

    // Push square (button) into array
    const array = [];
    for (let j = 0; j < size; ++j) {
      let subarray = [];
      for (let i = 0; i < size; ++i)
        subarray.push(
          <input
            inputMode="numeric"
            value={
              !board[i][j] || board[i][j] > size || board[i][j] < -size
                ? ""
                : Math.abs(board[i][j])
            }
            key={"item" + i + j}
            className="square"
            disabled={this.props.isEnding === "won" ? true : board[i][j] < 0}
            min={1}
            max={size}
            style={{
              color: board[i][j] > 0 ? "#FF1493" : "#000",
              backgroundColor: (i + j) % 2 === 1 ? "grey" : "white"
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
      <div className="n34">
        <h1 style={{ float: "left" }}>
          {lang === "VN"
            ? "Kỷ Niệm Ngày Cưới Của Rubern & Maidel"
            : "Rubern & Maidel's Wedding Anniversary"}
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
              &nbsp;&nbsp;Từ khi còn nhỏ, Xan Irelia đã thích thú trước sự thanh
              nhã và vẻ đẹp từ chuyển động của con người. Dưới sự hướng dẫn của
              bà, cô học điệu múa lụa truyền thống trong tỉnh—dù khá ngờ vực về
              mối quan hệ thần bí của chúng với Tinh Linh Ionia, nhưng cô thực
              sự yêu chúng. Trên đường tìm kiếm cách làm chủ môn nghệ thuật này,
              cô rời nhà đến thụ giáo những nghệ nhân đáng kính nhất ở Thiên
              Phận Navori.
            </p>
            <p>
              &nbsp;&nbsp;Người dân Irelia sống hòa bình với láng giềng, nhưng
              tin đồn về quân xâm lược ngoại bang đã khiến nhiều người ở Thiên
              Phận lo lắng. Irelia trở về làng và thấy nó đã bị chiếm đóng,
              những binh sĩ Noxus đội mũ thép cầm giáo xua dân chúng qua những
              con đường. Đô đốc Duqal đã chiếm Xan làm nơi đóng quân.
            </p>
            <p>
              &nbsp;&nbsp;Cha Irelia, Lito, cùng các anh trai đã kháng cự; giờ
              cả nhà cô nằm dưới những ngôi mộ không tên rải rác khắp khu vườn.
            </p>
            <p>
              &nbsp;&nbsp;Trong cơn buồn thương, cô gái trẻ thấy người của Duqal
              đang khuân những món đồ giá trị khỏi ngôi nhà. Giữa đám chiến lợi
              phẩm là một huy hiệu kim loại lớn, biểu tượng của gia tộc Xan.
              Irelia chạy thẳng tới, giằng nó khỏi tay quân Noxus. Tên đô đốc
              hất cô ngã xuống đất, và lệnh cho đám chiến binh lấy búa đập nát
              huy hiệu, trước khi đào một ngôi mộ mới cho kẻ cứng đầu này.
            </p>
            <p>
              &nbsp;&nbsp;Irelia nhìn vào mảnh vụn của huy hiệu gia tộc Xan nằm
              trên mặt đất. Từ sâu trong tâm hồn, cô thấy một nhịp điệu lạ kỳ
              bắt đầu trỗi dậy. Những mảnh kim loại xoắn vặn, cứ như đang tự di
              chuyển, và niềm vui thuần khiết của những điệu nhảy lại tràn ngập
              tâm trí Irelia…
            </p>
            <p>
              &nbsp;&nbsp;Quét tay một cái, những mảnh vỡ bay vèo vèo, cắt qua
              người hai tên Noxus. Nhân lúc Duqal và thủ hạ đang choáng váng,
              Irelia chụp lấy tấm huy hiệu đã vỡ và chạy khỏi làng.
            </p>
            <p>
              &nbsp;&nbsp;Trong khu rừng tĩnh lặng cách đó rất xa, Irelia than
              khóc cho gia đình, và nhớ lại những gì bà đã dạy. Cô nhận ra những
              gì mình học được không chỉ là những điệu nhảy bình thường—chúng
              biểu hiện cho thứ gì đó to lớn hơn rất nhiều.
            </p>
            <p>
              &nbsp;&nbsp;Cuộc xâm lăng của Noxus sớm trở thành bài thử cho nền
              hòa bình mong manh ở Vùng Đất Đầu Tiên. Nghe đồn cả giáo chủ Karma
              cũng bị buộc phải đánh trả, dù các môn đồ của cô giờ đã rút khỏi
              Đền Vĩnh Hằng và không gây thêm bạo lực nào nữa. Khắp Navori,
              những con người bất mãn tập hợp lại. Một đội quân kháng chiến hình
              thành, và sẽ không ngừng nghỉ cho đến khi Ionia được giải phóng.
              Irelia gia nhập hàng ngũ đó, biểu diễn những vũ điệu tươi vui của
              mình trong những khu trại giữa rừng, để bảo tồn nền văn hóa đang
              mất dần.
            </p>
            <p>
              &nbsp;&nbsp;Cô mới suýt soát mười bốn tuổi khi trở lại Thiên Phận.
              Quân kháng chiến tham gia cùng đội dân binh đã thề bảo vệ các tu
              viện và các khu vườn thiêng hoang dã.
            </p>
            <p>
              &nbsp;&nbsp;Nhưng quân Noxus biết quá rõ nơi này đại diện cho điều
              gì. Tên tướng quân xảo quyệt Jericho Swain đã chiếm Thiên Phận và
              bắt quân phòng thủ làm con tin, hy vọng lùa đội tiếp viện vào bẫy.
            </p>
            <p>
              &nbsp;&nbsp;Chính lúc đó, định mệnh của Irelia trỗi dậy. Thoát
              khỏi mọi trói buộc, cô giải phóng hoàn toàn tiềm năng của điệu
              kiếm vũ. Một tá cựu binh của Swain ngã xuống, khiến hàng ngũ rối
              loạn trong lúc những người đang bị cầm tù tham chiến cùng cô,
              trước khi cô hạ gục chính tên tướng quân — cảnh cô gái giơ cao
              cánh tay bị chặt đứt của hắn chính là bước ngoặt của cuộc chiến.
            </p>
            <p>
              &nbsp;&nbsp;Chiến thắng này, Đại Chiến Vệ Quốc ở Navori, khiến Xan
              Irelia được mọi người Ionia biết tên, và mong cô lên làm lãnh đạo.
              Cô miễn cưỡng chỉ huy quân kháng chiến gần ba năm trước khi khải
              hoàn ở Vịnh Dalu. Ở đó, cô đã dồn Đô đốc Duqal vào chân tường, và
              báo thù cho những người thân đã khuất.
            </p>
            <p>
              &nbsp;&nbsp;Dù chiến tranh kết thúc đã lâu, nhưng Ionia vĩnh viễn
              bị nó thay đổi. Vùng Đất Đầu Tiên giờ bị chia cắt, với nhiều phe
              phái thù nghịch đấu đá lẫn nhau khốc liệt không khác gì với quân
              Noxus. Nhiều người tiếp tục trông đợi ở Irelia nhưng, trong khi
              người khác mong mỏi quyền lực, Irelia lại thấy không thoải mái với
              nó.
            </p>
            <p>
              &nbsp;&nbsp;Sâu trong trái tim, cô vẫn chỉ muốn nhảy múa một mình.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Irelia. Nhiệm vụ của bạn là điền vào
              các ô của bảng n*n sao cho mỗi hàng và cột đều chứa đủ các số từ 1
              đến n (giống sudoku ý lul), ô trắng chỉ chứa các số lẻ (1, 3, 5,
              7, etc..), ô đen chỉ chứa các số chẵn (2, 4, 6, 8, etc..). Sau đó
              bạn có thể khoe khoang rằng bạn chơi game của Rubern giỏi hơn
              Maidel.
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
