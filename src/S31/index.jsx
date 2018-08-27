import React from "react";
import Grad from "./lib/grad.js";
import "./index.less";

function Square(props) {
  return (
    <button
      className={"square" + (props.value === null ? "" : "-" + props.value)}
      onClick={props.onClick}
      disabled={props.isOver}
    />
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
    this.setState(function(prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
    lang = this.state.isToggleOn ? "VN" : "EN";
  }
  render() {
    const field = this.props.state.field;
    // console.log(field);
    const N = field.length;
    const M = field[0].length;

    const err = this.props.error ? this.props.error.message : null;
    const array = [];
    for (let j = 0; j < M; ++j) {
      let subarray = [];
      for (let i = 0; i < N; ++i)
        subarray.push(
          <Square
            key={"data" + i + "-" + j}
            value={this.props.state.field[i][j]}
            isOver={this.props.isEnding}
            onClick={() => this.props.place({ x: i, y: j })}
          />
        );
      subarray.push(
        <div className="board-side" key={"sidej" + j}>
          {this.props.state.cntj[j]}
        </div>
      );
      array.push(
        <div className="board-row" key={"line" + j}>
          {subarray}
        </div>
      );
    }
    let subarray = [];
    for (let i = 0; i < N; ++i) {
      subarray.push(
        <div className="board-side" key={"sidei" + i}>
          {this.props.state.cnti[i]}
        </div>
      );
    }
    array.push(subarray);

    let error = [];
    if (err !== null) {
      let err_return = null;
      switch (err) {
        case "tree_present":
          err_return = lang === "VN" ? "Đã có cây ở ô này!" : "Tree is here!";
          break;
        case "no_adj_tree":
          err_return =
            lang === "VN"
              ? "Không có cây liền kề ô này!"
              : "No adjancent trees found!";
          break;
        case "near_tent":
          err_return =
            lang === "VN" ? "Đã có lều dựng gần đây!" : "Nearby tent found!";
          break;
        default:
          null;
      }
      error.push(JSON.stringify(err_return));
    }
    let space = [];
    for (let i = 5; i-- > 0; ) space.push(<br key={"br" + i} />);

    return (
      <div className="s31">
        <h1 style={{ float: "left" }}>
          {lang === "VN"
            ? "Trại Quân Sự Của Tướng Grad, Tái Xuất"
            : "General Grad's Military Camp, Again"}
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
              &nbsp;&nbsp;Những con sông trên lục địa Valoran rất cổ xưa, nhưng
              vẫn chưa là gì so với con quỷ Tahm Kench. Từ những ổ đánh bạc xập
              xệ bên dòng sông Mãng Xà, qua những sòng bài mặn chát của
              Bilgewater, cho đến những bàn cá cược xa hoa ở Piltover và Zaun –
              tất cả những ai có cái nhìn thèm muốn đối với sự giàu có của người
              khác đều phải chạm mặt Tahm Kench, và bị nuốt chửng bởi cơn đói
              vĩnh cữu của Thủy Quái Đại Vương.
            </p>
            <p>
              &nbsp;&nbsp; Những con sông trên lục địa Valoran rất cổ xưa, nhưng
              vẫn chưa là gì so với con quỷ Tahm Kench. Từ những ổ đánh bạc xập
              xệ bên dòng sông Mãng Xà, qua những sòng bài mặn chát của
              Bilgewater, cho đến những bàn cá cược xa hoa ở Piltover và Zaun –
              tất cả những ai có cái nhìn thèm muốn đối với sự giàu có của người
              khác đều phải chạm mặt Tahm Kench, và bị nuốt chửng bởi cơn đói
              vĩnh cữu của Thủy Quái Đại Vương. Những câu chuyện đầu tiên về con
              quái vật này được kể bởi những lữ khách đã đi qua sông Mãng Xà. Họ
              cảnh báo về con thủy quái khổng lồ với cái miệng mở to như một cái
              hang động, nó sẽ dụ dỗ những kẻ chưa thỏa mãn bằng những lời hứa
              về một cuộc sống giàu sang. Một câu chuyện như thế kể về một cậu
              trai trẻ được tiếng thật thà. Dù là một người đưa đò, cậu vẫn mong
              muốn được thoát khỏi dòng sông nghèo mà cậu đã biết quá rõ, và
              Thủy Quái Đại Vương đã hứa sẽ cho cậu một trải nghiệm không thể
              nào quên nếu như cậu chịu thốt ra một lời nói dối. Cảm thấy nói
              dối một lời chẳng hại gì, cậu lái đò đã cố ý bẻ cong sự thật với
              anh trai mình. Đêm đó, con quỷ xuất hiện, nó chỉ ra một nhánh sông
              mà cậu chưa bao giờ để ý đến. Cậu men theo khúc sông dẫn đến khu
              cắm trại của một đoàn người lạ mặt, họ cho cậu thức ăn, nước uống,
              và đề nghị kết tình hảo hữu. Khi bình minh ló dạng, cậu đã ăn uống
              no đủ và chuẩn bị quay về nhà, con quỷ lại xuất hiện một lần nữa,
              đề nghị một trải nghiệm còn tuyệt vời hơn với giá là một lời nói
              dối nữa. Sự thèm muốn trỗi dậy, cậu chấp nhận giao kèo, và lại nói
              dối với những người chủ khu trại. Con sông một lần nữa rẽ nhánh và
              nó dẫn cậu đến một bữa tối còn xa hoa hơn. Việc này cứ tiếp diễn,
              từ đêm này đến đêm nọ, cho đến khi một người từng thật thà như cậu
              trở thành một kẻ nói dối như cuội.
            </p>
            <p>
              &nbsp;&nbsp;Khi con sông cuối cùng đổ ra biển, cậu phát hiện ra
              mình chỉ còn một mình và lạc lõng – không còn ai để nói dối cả.
              Cậu đã tự chọn cho mình quá nhiều lựa chọn xấu, và chẳng còn đường
              nào để quay trở về nhà nữa.
            </p>
            <p>
              &nbsp;&nbsp;Những dòng sông trong lục địa đã đưa những câu chuyện
              về Thủy Quái Đại Vương đến Quần Đảo Lửa Xanh, nơi con quái vật này
              được đặt cho một cái tên, và cũng là lúc huyền thoại về nó được
              lan truyền rộng rãi – Tahm Kench. Ở Bilgewater, tài vận là phù du,
              sự giàu có có thể đến và đi nhanh như cách thủy triều dâng lên và
              hạ xuống. Những câu chuyện trên bàn nhậu nơi đây kể về ol’Tahm,
              một con thủy quái với sự thèm muốn vĩnh cữu dành cho những trò
              chơi may rủi, và sinh vật khoác lác này đã trở thành biểu tượng
              của nhiều sòng bạc và hiệu buôn trên khắp thành phố.
            </p>
            <p>
              &nbsp;&nbsp;Khi Cổng Mặt Trời mở cửa cho giao thương giữa
              Bilgewater và Piltover, những câu chuyện về Tahm Kench bắt đầu
              được lan truyền đến Thành Phố Tân Tiến và người anh em của nó bên
              dưới, Zaun. Nơi đây, bọn trẻ con gọi Tahm là “Áo Khoác Đôi”, một
              con cá quái dị to đến nỗi nó phải mặc hai chiếc áo khoác cỡ lớn
              được khâu lại với nhau. Với một chiếc mũ chóp hài hước và một nụ
              cười đủ nuốt chửng một người trưởng thành, nó khơi gợi lòng đố kỵ
              trong những tạo tác gia trẻ. Người ta kể rằng nó đã từng đến với
              một nhà phát minh vào Ngày Tiến Bộ, đề nghị với cô một ý tưởng sẽ
              được thu hút sự chú ý của một gia tộc giàu có. Tất cả những gì nó
              đòi lại là một nắm tóc của cô. Cô gái đầy tham vọng đã thực hiện
              giao kèo, và đúng như thế, ý tưởng đó đã giúp cô nhận được một
              khoản hợp đồng hấp dẫn. Nhưng một phát minh thì không đủ, và Áo
              Khoác Đôi đã quay trở lại, và lần này nó đòi hỏi mái tóc xinh đẹp
              của cô. Không muốn làm người chủ mới của mình thất vọng, cô gái
              đồng ý, và Áo Khoác Đôi nuốt chửng mái tóc cô ngay lập tức. Nhưng
              nhà phát minh vẫn không thể tiếp tục nghĩ ra được một ý tưởng đột
              phá nào để làm nên tên tuổi của cô cả. Con quỷ một lần nữa quay
              lại, và lần này giao kèo của nó đòi một đầu ngón tay của cô. Tuần
              tiếp theo, đó là một cái tai. Và sau một năm, cô gái chẳng còn gì
              để có thể giao kèo nữa. Cô tuyệt vọng cầu khẩn Áo Khoác Đôi, mong
              muốn nó sẽ dừng mọi thứ lại.
            </p>
            <p>
              &nbsp;&nbsp;Nó cười lớn và mở rộng đôi hàm của mình ra, nói với cô
              rằng nó sẽ bảo vệ cô khỏi chính bản thân cô ta, và rồi nó nuốt
              chửng lấy cô.
            </p>
            <p>
              &nbsp;&nbsp;Thủy Quái Đại Vương. Kẻ Khệnh Khạng Khổng Lồ. Bụng To.
              Áo Khoác Đôi. Con thủy quái Tahm Kench được biết đến với rất nhiều
              biệt danh, nhưng những ai đã từng gặp nó đều hiểu một sự thật duy
              nhất: dù những lời hứa của nó có hấp dẫn đến như thế nào đi chăng
              nữa, bạn chắc chắn sẽ tới số nếu như nhảy vào miệng của nó.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Tahm Kench. Không khác gì lần trước,
              nhiệm vụ của bạn vẫn chỉ là giúp tướng Grad dựng doanh trại bằng
              cách đặt những cái lều nằm ngay cạnh một lùm cây, sao cho không có
              2 lều nào nằm trong 2 ô vuông liền kề nhau. Cuối mỗi cột / hàng
              cho biết số lều cần có trên mỗi cột / hàng đó.
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
