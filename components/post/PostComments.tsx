import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import { getEnv, getURL, url } from '../../api/url';

interface OwnProps {
    id: string
}

type Props = OwnProps;

const PostComments: FunctionComponent<Props> = (props) => {
    // const doComments = () => (getEnv(document.head) != 'local')
    const doComments = () => false

    useEffect(() => {
        if(doComments()) {
            const script = document.createElement("script")

            script.src = "/comments/js/embed.min.js"
            script.setAttribute('data-isso', '/comments')
            script.setAttribute('data-isso-require-author', 'true')
            script.setAttribute('data-isso-id', 'post.' + props.id)
            script.async = true

            document.body.appendChild(script)
        
            return () => { document.body.removeChild(script) }
        }
    }, [ ])

    return (<>
        {doComments() ? 
            <>
                <section id="isso-thread"></section>
            </>
        : ''}
    </>)
}

// const PostComments: FunctionComponent<Props> = (props) => {
//     const Comments = useRef<HTMLDivElement>(null)
//     const [ remark, setRemark ] = useState<any>(null)

//     const initRemark42 = (node: HTMLElement) => {
//         // @ts-ignore
//         if (window.REMARK42) {
//             if(remark) {
//                 remark.destroy()
//             }

//             // @ts-ignore
//             setRemark(window.REMARK42.createInstance({
//                 node: node,
//                 // @ts-ignore
//                 ...window.remark_config
//             }))
//         }
//     }

//     useEffect(() => {
//         const curr = Comments.current
//         if(!curr || curr.id != "remark42") return

//         const init = () => initRemark42(curr)

//         // @ts-ignore
//         if(window.REMARK42) {
//             init()
//         } else {
//             window.addEventListener('REMARK42::ready', init)
//         }

//         return () => {
//             if(remark) remark.destroy()
//             window.removeEventListener('REMARK42::ready', init)
//         }
//     }, [ Comments ])

//     return (<>
//         <div ref={Comments} id={"remark42"}>
//         </div>
//     </>);
// };

export default PostComments;
