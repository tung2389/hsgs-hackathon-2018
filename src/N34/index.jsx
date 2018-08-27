import React from "react";
import Sudoku from "./lib/sudoku.js";
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

    // Push square (button) into array
    const array = [];
    for (let j = 0; j < len; ++j) {
      let subarray = [];
      for (let i = 0; i < len; ++i)
        subarray.push(
          <input
            inputMode="numeric"
            value={
              !board[i][j] || board[i][j] > len ? "" : Math.abs(board[i][j])
            }
            key={"item" + i + j}
            className="square"
            disabled={this.props.isEnding === "won" ? true : board[i][j] < 0}
            min={1}
            max={len}
            style={{
              color: board[i][j] > 0 ? "#FF1493" : "#000",
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
      <div className="n34">
        <h1 style={{ float: "left" }}>
          {lang === "VN" ? "Top 16 của thầy Mothada" : "Mr.Mothada's Top 16"}
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
              &nbsp;&nbsp;Để hiểu thấu được truyền thuyết về Nautilus, trước
              tiên người ta phải biết về người đàn ông mà ngay cả những câu
              chuyện khoác lác nhất trong quán rượu cũng phải thừa nhận, rằng gã
              thật sự từng là một con người.
            </p>
            <p>
              &nbsp;&nbsp;Mặc dù những cơn sóng đã cuốn trôi tên thật của gã,
              nhưng đa số vẫn nhớ Nautilus không chỉ là một thủy thủ mà còn là
              một thợ lặn trục vớt. Bên ngoài vùng cực nam của Quần Đảo Lửa Xanh
              là một nghĩa trang đầy xác tàu đắm, đồn rằng những con tàu này mất
              tích khi đang trên đường tìm kiếm vùng đất hứa, nhằm trao đổi của
              cải tiền tài với sự bất tử. Vào những ngày đẹp trời, kho báu này
              lấp lánh rực rỡ dưới mặt biển như những lời dụ hoặc quyến rũ.
              Nhiều thủy thủ đoàn tìm kiếm thợ lặn để thu thập báu vật, và không
              ai có thể bì được với kỹ năng lặn biển tuyệt vời của gã khổng lồ
              cơ bắp Nautilus.
            </p>
            <p>
              &nbsp;&nbsp;Với khả năng nhịn thở vô cùng lâu dưới đáy nước,
              Nautilus thích lặn tự do không cần phụ thuộc vào bình khí. Luôn
              mang lên vô cùng nhiều vàng hoặc đồ trang sức quý giá cho thủy thủ
              đoàn, nhưng gã không hề đòi hỏi thù lao đặc biệt nào - gã chỉ yêu
              cầu thuyền trưởng ném một đồng vàng từ trên mạn tàu xuống biển khi
              tàu rời đi, như một cử chỉ tôn vinh và xoa dịu đại dương bao la.
              Đây chỉ là nỗi mê tín của một thủy thủ, nhưng nhiều người e sợ
              biển cả vẫn thực hiện nhằm đảm bảo chuyến về an toàn.
            </p>
            <p>
              &nbsp;&nbsp;Nhiều năm trục vớt đã khiến kho báu nhanh chóng cạn
              kiệt, mỗi mẻ thu thập lại ít đi một chút, cho đến một ngày thủy
              thủ đoàn của Nautilus nhận ra rằng con tàu và tất cả đều đã bị mua
              lại.
            </p>
            <p>
              &nbsp;&nbsp;Bình minh rực đỏ vào buổi sáng vị thuyền trưởng mới
              xuất hiện trên tàu. Đến từ một cảng nước ngoài, hắn mang theo một
              bộ đồ khổng lồ bằng đồng thau và sắt. Hắn chỉ tập trung vào
              Nautilus; quả thực, hắn đã mua lại con tàu vì Nautilus. Rõ là tên
              thuyền trưởng này bị ám ảnh bởi một xác tàu kỳ bí, con tàu này vẫn
              chìm trong bóng tối ngay cả vào ngày đẹp trời. Bộ giáp lặn có thể
              chịu được áp lực dưới đáy đại dương lâu hơn bất kỳ một người nào,
              đủ để thu thập những thứ ẩn giấu dưới bóng tối bất thường kia.
            </p>
            <p>
              &nbsp;&nbsp;Thủy thủ đoàn cho rằng có việc làm còn hơn nhịn đói,
              và Nautilus bắt đầu bị đóng vào bộ giáp lặn, sàn gỗ rền rĩ vì sức
              nặng của nó. Cơn hoảng loạn dâng tràn trong lồng ngực khi gã nhận
              ra họ không có gì để trả tiền lễ. Tên thuyền trưởng nước ngoài
              cười phá lên khi Nautilus được hạ dần xuống mặt nước. Hắn đảm bảo
              với thủy thủ đoàn rằng thứ mà Quý Bà Râu đang bảo vệ sẽ khiến họ
              giàu có vượt xa tưởng tượng. Khi Nautilus trở lại, họ sẽ trả món
              tiền lễ ngớ ngẩn đó.
            </p>
            <p>
              &nbsp;&nbsp;Khi Nautilus chìm dần, ánh sáng phía trên ngày một mờ
              đi, và tất cả trở nên tĩnh lặng, tiếng thở của gã là âm thanh duy
              nhất vang vọng trong bộ giáp lặn. Và rồi một cái gì đó vươn ra từ
              vực thẳm. Gã đang bị nó kéo xuống, lần đầu tiên trong đời gã thấy
              như tim mình bị bóp nghẹt bởi sự sợ hãi. Đó không phải là kho báu
              thuyền trưởng tìm kiếm, mà là một nguồn sức mạnh ma quái đang say
              ngủ.
            </p>
            <p>
              &nbsp;&nbsp;Nautilus nắm lấy sợi xích mỏ neo, đây là mối liên kết
              cuối cùng của gã với thế giới bên trên, để đu dần lên khi cái thứ
              gì đó phía dưới đang cố kéo gã xuống. Nhưng trọng lượng của gã quá
              nặng. Ngay khi những ngón tay kim loại to lớn của gã sắp vươn ra
              khỏi mặt nước thì sợi xích gãy ngang. Nautilus gào thét trong bộ
              giáp lặn, nhưng không ai có thể nghe thấy. Gã đổ nhào vào vùng
              xoáy nước tăm tối, tay nắm chặt lấy mỏ neo trong tuyệt vọng. Những
              cái tua đen tuyền quấn quanh gã, và gã chỉ còn nhìn thấy đường nét
              mờ ảo của con tàu thân quen dần phai mờ. Và rồi mọi thứ chìm vào
              bóng tối.
            </p>
            <p>
              &nbsp;&nbsp;Khi Nautilus tỉnh dậy dưới đáy đại dương, gã đã là một
              thứ gì đó... khác biệt. Bóng tối không còn tổn thương gã nữa. Bộ
              giáp lặn cồng kềnh đã biến thành lớp vỏ bọc liền mạch ôm lấy gã ẩn
              giấu giao kèo mà nguồn sức mạnh nguyên thủy kia đã tạo ra với linh
              hồn của gã. Bị kẹt dưới vực thẳm không có tí ánh sáng mặt trời, gã
              chỉ nhớ duy nhất một việc--lời hứa không được thực hiện của tên
              thuyền trưởng mới.
            </p>
            <p>
              &nbsp;&nbsp;Nautilus thề rằng, ngay tại đây, ngay lúc này, tất cả
              đều phải trả tiền lễ cho đại dương. Gã sẽ tự mình kiểm chứng.
            </p>
            <p>
              &nbsp;&nbsp;Bị thúc đẩy bởi ý nghĩ này, gã tiến dần về phía bờ
              biển. Nhưng khi gã đến được Bilgewater, rất nhiều năm đã trôi qua,
              và gã không thể tìm thấy bất kỳ dấu vết nào của thuyền trưởng và
              thủy thủ đoàn. Gã đã không còn có thể quay lại cuộc sống lúc
              trước, gã cũng chẳng thể trả thù ai cả. Thay vì quay lại biển cả,
              gã chọn cách gieo rắc cơn thịnh nộ của mình lên những kẻ tham lam,
              kéo thủng thuyền của bọn chúng với cái mỏ neo hùng mạnh của gã.
            </p>
            <p>
              &nbsp;&nbsp;Đôi lúc, trong những cơn sóng, những ký ức xa xôi về
              con người lúc trước gã trôi nổi trên đường ngấn nước... nhưng bản
              ngã hiện tại của Nautilus vẫn luôn chìm đắm dưới mặt biển.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Nautilus. Nhiệm vụ của bạn chỉ là
              điền số vào bảng Sudoku của thầy Mothada và trở thành học sinh
              khủng nhất lớp chuyên toán.
            </p>
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Sudoku là trò chơi trên bảng n*n, nhiệm vụ của bạn là
              điền số vào bảng sao cho mỗi côt, mỗi hàng và mỗi ô vuông
              &#8730;n*&#8730;n đều có đủ các số từ 1 đến n
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
