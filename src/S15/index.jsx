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
    this.state = {
      isToggleOn: lang === "VN" ? false : true,
      isCheckerOn: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckerClick = this.handleCheckerClick.bind(this);
  }
  handleClick() {
    this.setState(function(prevState) {
      return {
        isToggleOn: !prevState.isToggleOn,
        isCheckerOn: prevState.isCheckerOn
      };
    });
    lang = this.state.isToggleOn ? "EN" : "VN";
  }
  handleCheckerClick() {
    this.setState(function(prevState) {
      return {
        isToggleOn: prevState.isToggleOn,
        isCheckerOn: !prevState.isCheckerOn
      };
    });
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
            onClick={() =>
              this.props.place({
                x: i,
                y: j,
                check_tent: this.state.isCheckerOn
              })
            }
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
        case "invalid_move_row":
          err_return =
            lang === "VN"
              ? "Số lều ở hàng vượt quá giới hạn"
              : "Number of tents in row is over limit!";
          break;
        case "invalid_move_col":
          err_return =
            lang === "VN"
              ? "Số lều ở cột vượt quá giới hạn"
              : "Number of tents in column is over limit!";
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
            ? "Trại Quân Sự Của Tướng Grad"
            : "General Grad's Military Camp"}
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

        <label
          style={{ float: "left", marginLeft: "10px", marginTop: "20px" }}
          className="btn"
          onClick={this.handleCheckerClick}
        >
          {lang === "VN"
            ? (this.state.isCheckerOn ? "Tắt" : "Bật") + " kiểm tra cột & hàng"
            : "Turn " +
              (this.state.isCheckerOn ? "off" : "on") +
              " column & row checker"}
        </label>

        <input className="modal-state" id="modal-1" type="checkbox" />
        <div className="modal">
          <label className="modal__bg" htmlFor="modal-1" />
          <div className="modal__inner">
            <label className="modal__close" htmlFor="modal-1" />
            <h1>Cốt truyện</h1>
            <p>
              &nbsp;&nbsp;Khi còn trẻ, Pyke khởi đầu như bao kẻ khác ở
              Bilgewater: trên cầu cảng sát sinh. Hàng ngày, lũ quái vật dưới
              biển sâu bị kéo tới đây để xả thịt. Hắn tìm được công ăn việc làm
              ở quận Cảng Máu Me, bởi kể cả thủy triều cũng không đủ sức tẩy
              sạch màu đỏ nhớp nhúa không ngừng chảy ra từ kè gỗ.
            </p>
            <p>
              &nbsp;&nbsp;Hắn nhanh chóng quen việc — với cả sự ghê tởm và đồng
              lương còm cõi của nó. Hết lần này đến lần khác, Pyke nhìn những
              túi vàng nặng trịch trao cho các thuyền trưởng để đổi lấy xác lũ
              thủy quái mà hắn và đồng nghiệp sẽ mổ xẻ để bán. Hắn mong muốn có
              nhiều hơn là vài xu trong túi, và đã tìm cách thuyết phục một đoàn
              thủy thủ cho nhập bọn. Hiếm kẻ dám săn theo phong cách truyền
              thống của Quần Đảo Mãng Xà: bắn mình vào mục tiêu để găm mũi móc
              bằng tay không, rồi bắt đầu đồ sát chúng khi chúng còn đang sống.
              Can đảm và tài giỏi, Pyke nhanh chóng trở thành tay lao thủ giỏi
              nhất mà tiền bạc có thể mua được. Hắn biết thịt chẳng đáng giá gì
              so với vài cơ quan nội tạng của lũ quái to lớn hơn, nguy hiểm hơn…
              thứ nội tạng cần thu hoạch lúc còn tươi.
            </p>
            <p>
              &nbsp;&nbsp;Tuy vào độ khó của cuộc săn, mỗi con quái vật biển lại
              có giá riêng, và thứ được đám thương gia Bilgewater thèm khát nhất
              là cá quỷ. Từ bộ hàm đầy răng sắc như dao cạo của nó, người ta lấy
              ra các bao sapphilite vô giá đem bán khắp Runeterra cho những kẻ
              muốn chưng cất linh dược, và một bình con con thứ dầu lam lấp lánh
              đủ sức mua mười con tàu lẫn thủy thủ đoàn trên đó. Nhưng trong lúc
              đi săn cùng một thuyền trưởng thiếu tin cậy, Pyke đã học được bài
              học xương máu.
            </p>
            <p>
              &nbsp;&nbsp;Sau nhiều ngày hành trình, một con cá quỷ khổng lồ
              xuất hiện, há to bộ hàm, để lộ hàng dãy túi sapphilite. Chừng chục
              mũi lao móc giữ con vật lại, và dù nó lớn hơn bất kỳ con nào hắn
              từng đụng độ, Pyke vẫn nhảy thẳng vào miệng nó không do dự
            </p>
            <p>
              &nbsp;&nbsp;Khi hắn chuẩn bị bắt tay vào làm việc, cổ họng con vật
              bắt đầu rung lên. Bong bóng sôi ùng ục trên mặt biển, và một đàn
              cá quỷ bắt đầu lao vào con tàu. Viên thuyền trưởng hoảng hốt cắt
              dây bảo hiệm của Pyke. Thứ cuối cùng tay lao thủ xấu số nhìn thấy
              trước khi bộ hàm con quái khép lại là vẻ mặt kinh hoàng của các
              đồng đội khi trông thấy hắn bị nuốt chửng.
            </p>
            <p>&nbsp;&nbsp;Nhưng đó chưa phải dấu chấm hết cho Pyke.</p>
            <p>
              &nbsp;&nbsp;Dưới đáy sâu của đại dương vô danh, bị nghiền nát bởi
              áp lực ghê hồn, và vẫn kẹt cứng trong miệng con cá quỷ, hắn mở
              mắt. Ánh sáng lam rải khắp nơi, hàng nghìn hàng nghìn đốm sáng như
              đang dõi theo hắn. Tiếng vọng run rẩy của thứ gì đó cổ xưa và bí
              ẩn tràn ngập tâm trí hắn, đập tan nó, cho hắn thấy ảo cảnh về tất
              cả những gì hắn đã mất trong khi kẻ khác thì giàu sụ.
            </p>
            <p>
              &nbsp;&nbsp;Một khao khát mới chiếm lấy Pyke, khao khát báo thù và
              phục hận. Hắn sẽ chất đầy dưới đáy sâu thi thể của những kẻ đã đối
              xử tệ bạc với hắn.
            </p>
            <p>
              &nbsp;&nbsp;Ở Bilgewater, không ai nghĩ gì nhiều đến mấy vụ sát
              hại—ở nơi nguy hiểm này, thỉnh thoảng dòng triều chuyển màu đỏ
              cũng chả có gì lạ. Nhưng hết tuần đến tháng, người ta bắt đầu nhận
              ra quy luật. Thuyền trưởng các con tàu bị xé xác và bỏ mặc dưới
              ánh bình minh. Chủ các phòng rượu đồn đại về một kẻ sát nhân siêu
              nhiên, bị bỏ mặc ngoài biển, đã tìm đường trở lại. Từng là dấu
              hiệu của sự kính trọng và danh tiếng, câu hỏi “Ngươi là thuyền
              trưởng hả?” trở thành lời cảnh báo.
            </p>
            <p>
              &nbsp;&nbsp;Rồi thợ đóng thuyền, thuyền phó, chỉ huy thương đội,
              chủ ngân hàng,… bất kỳ ai có dính dáng đến chuyện làm ăn trên cầu
              cảng sát sinh đều chịu chung số phận. Một cái tên mới ghim trên
              bảng truy nã: một ngàn kim xà cho tên Sát Thủ Vùng Nước Đỏ lừng
              danh.
            </p>
            <p>
              &nbsp;&nbsp;Đi theo những ký ức bị đáy sâu làm sai lệch, Pyke đã
              thành công ở nơi mọi người thất bại—lan truyền nỗi sợ vào trái tim
              những kẻ máu lạnh ở Bilgewater. Một thành phố tự hào về nghề săn
              quái vật giờ đã tìm ra một con quái vật săn đuổi nó, và Pyke không
              có ý định dừng lại.
            </p>
            <br />
            <p style={{ fontStyle: "italic" }}>
              &nbsp;&nbsp;Đó là tiểu sử của Pyke. Nhiệm vụ của bạn chỉ là giúp
              tướng Grad dựng doanh trại bằng cách đặt những cái lều nằm ngay
              cạnh một lùm cây, sao cho không có 2 lều nào nằm trong 2 ô vuông
              liền kề nhau. Cuối mỗi cột / hàng cho biết số lều cần có trên mỗi
              cột / hàng đó.
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
