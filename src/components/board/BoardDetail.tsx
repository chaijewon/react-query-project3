import {useParams,useNavigate,Link} from "react-router";
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useEffect} from "react";
interface BoardDetailResponse {
    no:number;
    name:string;
    subject:string;
    content:string;
    dbday:string;
    hit:number;
}
// => function / return을 제거할 수 있다
function BoardDetail() {
    const {no}= useParams<{no:string}>();
    const nav=useNavigate();
    const {isLoading,isError,error,data,refetch:boardDetail}=useQuery<{data:BoardDetailResponse}>({
        queryKey:["board-detail",no],
        queryFn:async()=>{
            return apiClient.get(`/board/detail/${no}`)
        }
    })

    useEffect(() => {
        if(!isLoading)
        {
            boardDetail();
        }

    }, []);

    if(isLoading)
        return <h3>서버에서 데이터 전송 지연</h3>
    if(isError)
        return <h3>서버 에러 발생 : {`${error}`}</h3>

    const board=data?.data
    if(!board) return null;
    console.log(board)
    return (
        <div className="container">
            <div className="row">
                <h3>내용보기</h3>
                <table className="table">
                    <tbody>
                     <tr>
                         <th style={{"width":"20%"}} className={"text-center"}>번호</th>
                         <td style={{"width":"30%"}} className={"text-center"}>{board.no}</td>
                         <th style={{"width":"20%"}} className={"text-center"}>작성일</th>
                         <td style={{"width":"30%"}} className={"text-center"}>{board.dbday}</td>
                     </tr>
                     <tr>
                         <th style={{"width":"20%"}} className={"text-center"}>이름</th>
                         <td style={{"width":"30%"}} className={"text-center"}>{board.name}</td>
                         <th style={{"width":"20%"}} className={"text-center"}>조회수</th>
                         <td style={{"width":"30%"}} className={"text-center"}>{board.hit}</td>
                     </tr>
                     <tr>
                         <th style={{"width":"20%"}} className={"text-center"}>제목</th>
                         <td colSpan={3} className={"text-center"}>{board.subject}</td>
                     </tr>
                    <tr>
                        <td colSpan={4} className={"text-left"} valign={"top"}
                         height={200}
                        ><pre style={{"whiteSpace":"pre-wrap","backgroundColor":"white","border":"none"}}>{board.content}</pre></td>
                    </tr>
                    <tr>
                        <td colSpan={4} className={"text-right"}>
                            <Link className="btn btn-primary btn-xs" to={""}>수정</Link>
                            <Link className="btn btn-primary btn-xs" to={""}>삭제</Link>
                            <Link className="btn btn-primary btn-xs" to={"/board/list"}>목록</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BoardDetail;