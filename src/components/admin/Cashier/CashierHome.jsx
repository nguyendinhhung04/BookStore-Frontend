import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function CashierHome() {

    const navigate = useNavigate();

    const handleCreatePayment = () => {
        navigate("/admin/customer/view");
    }

    const handleFindPayment = () => {
        navigate("/admin/cashier/searchBill");    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '50px' }}>
                <button onClick={() => {handleCreatePayment()}}>Thanh toán </button>
                <button onClick={() => {handleFindPayment()}}>Tìm thanh toán</button>
            </div>
        </>
    )
}