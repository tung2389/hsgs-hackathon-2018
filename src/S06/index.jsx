import React from "react";
import Tshirt from "./lib/tshirt.js";
import "./index.less";

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
      disabled={props.isOver}
      style={{
        color: props.isChoosen ? "white" : "#00b2cc",
        backgroundColor: props.isChoosen ? "#00e5ff" : "white",
        borderColor: "#00b2cc"
      }}
    >
      {props.value}
    </button>
  );
}

let lang = "VN";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: lang === "VN" ? false : true };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // lang toggle
    this.setState(function(prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
    lang = this.state.isToggleOn ? "VN" : "EN";
  }
  render() {
    const board = this.props.state.board;
    const selection = this.props.state.selection;
    const N = board.length;
    const M = board[0].length;

    // error lang switch
    const err = this.props.error ? this.props.error.message : null;
    let error = [];
    if (err !== null) {
      let err_return = null;
      switch (err) {
        case "num_lined":
          err_return =
            lang === "VN"
              ? "Những số được đánh dấu không được liền kề nhau!"
              : "Marked number can't be lined up";
          break;
        default:
          null;
      }
      error.push(JSON.stringify(err_return));
    }

    //build board
    const array = [];
    for (let j = 0; j < M; ++j) {
      let subarray = [];
      for (let i = 0; i < N; ++i)
        subarray.push(
          <Square
            key={"data" + i + "-" + j}
            isOver={this.props.isEnding}
            onClick={() => this.props.choose({ x: i, y: j })}
            value={board[i][j]}
            isChoosen={selection[i][j]}
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
      <div className="s06">
        <h1 style={{ float: "left" }}>
          {lang === "VN"
            ? "Áo Phông Cho Hội Toán"
            : "T-shirt For The Math Club"}
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
          onClick={this.props.reset}
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
              &nbsp;&nbsp;Từ rất lâu về trước, những đại dương của Runeterra đã
              là cái nôi của những nền văn minh cổ xưa hơn nhiều so với những
              chủng tộc trên đất liền. Dưới vực sâu của nơi mà hiện tại được gọi
              là Biển Vệ Thần, một thành phố lớn đã từng tồn tại – và Fizz cũng
              là một cư dân của nơi đây. Cậu đã sống cùng những thợ thủ công và
              những chiến binh của một chủng tộc cao quý. Dù không phải là một
              trong số họ, Fizz vẫn luôn được đối xử công bằng, và bản chất tinh
              nghịch cùng những câu chuyện về những chuyến hải trình luôn khiến
              cậu được chào đón tại nơi đây.
            </p>
            <p>
              &nbsp;&nbsp;Nhưng thế giới luôn thay đổi. Đại dương ấm dần lên,
              đánh thức những con thú săn mồi hung hãn từ dưới đáy sâu của vực
              thẳm. Từng thành phố một chìm vào im lặng, nhưng lãnh đạo của
              thành phố lớn vẫn chưa thể quyết định được cách để đối phó hiểm
              họa này. Fizz đã nhận nhiệm vụ thăm dò biển cả để tìm kiếm những
              người sống sót, hoặc ít nhất là tìm ai đó biết được chuyện gì đã
              xảy ra.
            </p>
            <p>
              &nbsp;&nbsp;Và rồi, trong một ngày âm u, bầy cá mập khổng lồ đã
              đến.
            </p>
            <p>
              &nbsp;&nbsp;Những con cá mập rồng này làm tê liệt con mồi của
              chúng bằng những tiếng rít chết chóc, những con đường trong thành
              phố nhanh chóng bị nhuộm đỏ. Hàng ngàn người bỏ mạng chỉ trong vài
              giờ, công trình, đền đài bị phá sập trong cơn đói khủng khiếp của
              đàn thú hoang. Đánh hơi thấy mùi máu trong nước biển, Fizz tức tốc
              bơi về, quyết tâm tham gia trận chiến để cứu lấy thành phố.
            </p>
            <p>
              &nbsp;&nbsp;Nhưng cậu đã quá trễ. Thành phố chẳng còn gì để cứu
              vớt cả. Khi đống đổ nát lắng xuống, chẳng còn một sinh vật nào
              sống sót, cũng chẳng có một viên gạch nào còn nguyên vẹn, và bầy
              cá dữ đã đi mất. Chỉ còn lại một mình, Fizz rơi vào đau khổ và
              tuyệt vọng. Ma thuật yordle bên trong Fizz dần tan biến khi cậu
              thả mình theo dòng hải lưu, trôi dạt trong nỗi buồn, và chìm trong
              cơn mộng mị kéo dài hàng thiên niên kỉ.
            </p>
            <p>
              &nbsp;&nbsp;Chỉ có một thứ duy nhất đã có thể đánh thức cậu. Một
              nắm những đồng xu rơi xuống từ phía trên mặt biển, rải rác xuống
              thềm cát trong khi một con cá gỗ khổng lồ đang bơi ngang qua trên
              mặt nước. Dù đó không phải là cá mập khổng lồ, nhưng Fizz vẫn cảnh
              giác và thức giấc – cậu không biết gì về thế giới phía trên, nhưng
              rõ là cá không sống được ở trên đấy. Cậu bơi lên và lần đầu tiên
              hít thở không khí của bề mặt.
            </p>
            <p>
              &nbsp;&nbsp;Đó là con người, con người đã sinh sống bên trên mặt
              nước và cưỡi trên những con cá gỗ với đủ mọi kích cỡ. Fizz cảm
              thấy vừa lo sợ lại vừa hứng thú, nhưng món quà kì lạ mà họ rải
              xuống dòng nước đủ nói lên rằng họ đang muốn làm bạn với cậu. Sau
              một thời gian theo bước đoàn người đi đi lại lại giữa đại dương
              mênh mông, cậu đã đến được thành phố cảng Bilgewater.
            </p>
            <p>
              &nbsp;&nbsp;Để sống sót ở một nơi hỗn độn như thế, sinh vật kì lạ
              này đã nhanh chóng trở thành một huyền thoại – Kẻ Nghịch Ngợm Thủy
              Triều, tinh linh của đại dương. Người ta đồn đại rằng cậu có thể
              triệu hồi những con thủy quái để giúp đỡ mình, hay đục thủng một
              chiếc thuyền với cây đinh ba hải thạch của cậu. Những đứa trẻ hư
              cũng hay bị dọa trong những đêm không trăng rằng: “Ngủ nhanh đi,
              không thì Kẻ Nghịch Ngợm sẽ đến và đem ngươi cho cá ăn đấy!”
            </p>
            <p>
              &nbsp;&nbsp;Bản chất của Fizz là tốt bụng, nhưng cậu nghịch ngợm
              còn hơn cả một yordle bình thường, và luôn thích thú mỗi khi chơi
              khăm được những cư dân ở Bilgewater. Những ngư dân dày dặn nhất
              đều biết rằng, giống như thủy triều của đại dương, chú Yordle tinh
              nghịch này sẽ dẫn họ đến những mẻ lưới đầy ắp một cách dễ dàng.
              Tuy nhiên, Fizz cũng không ưa gì những kẻ tham lam hay ích kỉ, và
              đã nhiều hơn một lần những tên thuyền trưởng xấu tính nhận ra rằng
              hoa tiêu bí ẩn của chúng không hề dẫn đoàn thuyền đến nơi an toàn,
              mà là xuống đáy biển.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Fizz. Nhiệm vụ của bạn chỉ là giúp
              bác thợ in Hasan xóa vài con số trên bảng sao cho không có số nào
              trùng lặp trong mỗi cột hoặc hàng, các ô bị xóa không được nằm
              liền kế nhau trên một đường thẳng, nhưng có thể tiếp xúc ở góc;
              các ô còn lại phải tiếp xúc nhau theo hàng ngang và/hoặc hàng dọc
              như yêu cầu của thầy Goldstein. Sau đó bác Hasan có thể in áo cho
              thầy Goldstein và PROFIT.{" "}
              <img
                src="http://i0.kym-cdn.com/photos/images/masonry/001/324/306/54a"
                alt="POGGERS"
                style={{ width: "30px", height: "30px" }}
              />
              <img
                src="http://i0.kym-cdn.com/photos/images/masonry/001/324/306/54a"
                alt="POGGERS"
                style={{ width: "30px", height: "30px" }}
              />
            </p>
          </div>
        </div>

        {space}

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
