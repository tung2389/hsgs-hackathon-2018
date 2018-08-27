import React from "react";

class train extends React.Component {
    constructor(props)  {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    tick() {
        this.setState({
          date: new Date()
        });
      }
      render() {
        return (
            <div>
                <p> 
                CHÀO MỪNG CÁC BẠN ĐẾN VỚI GAME VUI.SAU ĐÂY LÀ LUẬT CHƠI:
                </p>
                <b/>
                <p>        
                CÁC BẠN HÃY PICK CÁC Ô CHO VÀO BẢNG SAO CHO TỔNG CÁC HÀNG, CÁC CỘT, ĐƯỜNG CHÉO BẰNG NHAU
                </p> <b />
                <p> 
                NÚT Chose : CHO BẠN PICK 1 TRONG 16 Ô Ở HÀNG THỨ 5 NẾU Ô ĐÓ CHƯA ĐƯỢC PICK.
                </p> <b />
                <p>
                NÚT To : CHO BẠN CHỌN 1 TRONG 16 Ô Ở BẢNG 4x4 ĐỂ ĐƯA GIÁ TRỊ BẠN PICK VÀO NẾU Ô ĐÓ TRỐNG.    
                </p> <b />
                <p>
                NGOÀI RA NÚT UNDO ĐỂ HỖ TRỢ BẠN TRONG QUÁ TRÌNH CHƠI CÓ THỂ QUAY LẠI NHỮNG BƯỚC TRƯỚC ĐÓ.    
                </p> <b />    
                <p> 
                ĐẢM BẢO CÓ CÁCH CHƠI. CHÚC CÁC BẠN CHƠI GAME VUI VẺ.
                </p>
                <h1> It is {this.state.date.toLocaleTimeString()} </h1>
            </div>
        );
    }
}
export default train;