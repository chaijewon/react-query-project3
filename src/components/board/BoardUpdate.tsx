import {useParams,useNavigate} from "react-router-dom";
import {useQuery,useMutation} from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {useEffect, useRef, useState} from "react";
import {AxiosResponse,AxiosError} from "axios";

// 값을 받아서 => 화면 출력
interface BoardUpdateItem {
    no: number;
    name: string;
    subject:string;
    content: string;
}
// 수정 결과값 : yes/no
interface BoardUpdateResponse {
    msg: string;
}
function BoardUpdate(){
    const {no}= useParams();
    const nav=useNavigate();
    const nameRef=useRef<HTMLInputElement>(null)
    // <input>
    const subjectRef=useRef<HTMLInputElement>(null)
    const contentRef=useRef<HTMLTextAreaElement>(null)
    const pwdRef=useRef<HTMLInputElement>(null)
    const [name, setName] = useState<string>("")
    const [subject, setSubject] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [pwd, setPwd] = useState<string>("")

    const { data } = useQuery({
       queryKey: ['board-update', no],
       queryFn: async () => {
           return apiClient.get<BoardUpdateItem>(`/board/update/${no}`)
       }
    });

    console.log(data)
    const board=data?.data
    console.log(board)

    useEffect(() => {
        if(board)
        {
            setName(board.name)
            setSubject(board.subject)
            setContent(board.content)
        }

    }, [board]);
    return (
        <div className={"container"}>
            <div className="row">
                <h3>수정</h3>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <th className={"text-center"} style={{"width":"15%"}}>이름</th>
                        <td style={{"width":"85%"}}>
                            <input type={"text"} className={"input-sm"}
                                   size={20}
                                   ref={nameRef}
                                   value={name}
                                   onChange={(e:any):void=>setName(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th className={"text-center"} style={{"width":"15%"}}>제목</th>
                        <td style={{"width":"85%"}}>
                            <input type={"text"} className={"input-sm"}
                                   size={50}
                                   ref={subjectRef}
                                   value={subject}
                                   onChange={(e:any):void=>setSubject(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th className={"text-center"} style={{"width":"15%"}}>내용</th>
                        <td style={{"width":"85%"}}>
                              <textarea
                                  onChange={(e:any):void=>setContent(e.target.value)}
                                  rows={10} cols={50}
                                  value={content}
                                  ref={contentRef}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th className={"text-center"} style={{"width":"15%"}}>비밀번호</th>
                        <td style={{"width":"85%"}}>
                            <input type={"password"} className={"input-sm"}
                                   size={10}
                                   ref={pwdRef}
                                   value={pwd}
                                   onChange={(e:any):void=>setPwd(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={"text-center"}>
                            <button className={"btn btn-primary"} >글쓰기</button>
                            <button className={"btn btn-primary"} >취소</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default BoardUpdate


