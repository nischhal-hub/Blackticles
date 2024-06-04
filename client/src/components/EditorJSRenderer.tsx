import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {cn} from '../utils/cn'
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowUp } from 'react-icons/fa';

interface IRendererProp {
    data: string
}
interface IStyles {
    header: Record<string, string>;
    paragraph: string;
    list: Record<"ol" | "ul", string>;
}

export const EditorJSRenderer: FC<IRendererProp> = ({ data }) => {
    const [showReadMore, setShowReadMore] = useState(false);
    const [showMore, setShowMore] = useState(false);



    const containerRef = useRef<HTMLDivElement>(null);
    const styles = {
        header: {
            "1": "text-2xl font-grot font-bold mt-4",
            "2": "text-xl font-grot font-bold mt-4",
            "3": "text-lg font-grot font-bold mt-4",
            "4": "text-base font-grot font-bold mt-4",
            "5": "text-sm font-grot font-bold mt-4",
            "6": "text-md font-grot font-bold mt-4",
        },
        paragraph: "font-playFair text-xl mt-4 tracking-normal md:text-lg",
        list: {
            "ol": "list-decimal ml-5 ",
            "ul": "list-disc ml-5 ",
        }

    }

    const dataBlocks = useCallback((styles: IStyles, data: string) => {
        try {
            const parsedContent = JSON.parse(data) as {
                time: number;
                blocks: {
                    id: string;
                    type: | "paragraph" | "header" | "list" | "code" | "image" | "raw";
                    data: unknown;
                }[];
                version: string;
            }
            console.log(parsedContent)
            return parsedContent.blocks.map((item: any) => {
                switch (item.type) {
                    case "header":
                        const header_data = item.data as {
                            text: string;
                            level: 1 | 2 | 3 | 4 | 5 | 6;
                        }
                        const Header = `h${header_data.level}` as keyof JSX.IntrinsicElements; //*TYPE FOR ALL STANDARD HTML ELEMENTS.
                        return <Header key={item.id} className={cn(styles.header?.[header_data.level])}>
                            {header_data.text}
                        </Header>

                    case "paragraph":
                        const paragraph_data = item.data as { text: string }
                        return <p key={item.id} className={cn(styles.paragraph)}>
                            {paragraph_data.text}
                        </p>
                    case "list":
                        const list_data = item.data as {
                            style: string;
                            items: string[];
                        }
                        const List = list_data.style === "ordered" ? "ol" : "ul";
                        return <List key={item.id} className={cn(
                            'ml-5 font-grot',
                            list_data.style === "ordered" ? "list-decimal" : "list-disc"
                        )}>
                            {list_data.items.map((item: string,i:number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </List>
                    case "raw":
                        const raw_data = item.data as {
                            html: string;
                        }
                        return (
                            <div key={item.id}
                                className="mx-auto my-4 w-[500px] bg-gray-950 rounded-xl overflow-hidden drop-shadow-xl "
                            >
                                <div className="bg-[#333] flex items-center p-[5px] text-whitec relative">
                                    <div className="flex absolute left-3">
                                        <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-xl mr-2"></span>
                                        <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-xl mr-2"></span>
                                        <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-xl"></span>
                                    </div>
                                    <div className="flex-1 text-center text-white">status</div>
                                </div>
                                <div className="p-2.5 text-[#0f0]">
                                    <div>
                                        <p>{raw_data.html}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    case "code":
                        const code_data = item.data as {
                            code: string;
                        }
                        return (
                            <div key={item.id}
                                className="mx-auto my-4 w-[500px] bg-gray-950 rounded-xl overflow-hidden drop-shadow-xl "
                            >
                                <div className="bg-[#333] flex items-center p-[5px] text-whitec relative">
                                    <div className="flex absolute left-3">
                                        <span className="h-3.5 w-3.5 bg-[#ff605c] rounded-xl mr-2"></span>
                                        <span className="h-3.5 w-3.5 bg-[#ffbd44] rounded-xl mr-2"></span>
                                        <span className="h-3.5 w-3.5 bg-[#00ca4e] rounded-xl"></span>
                                    </div>
                                    <div className="flex-1 text-center text-white">status</div>
                                </div>
                                <div className="p-2.5 text-[#0f0]">
                                    <div>
                                        <p>{code_data.code}</p>
                                    </div>
                                </div>
                            </div>
                        )

                    case "image":
                        const image_data = item.data as {
                            file: {
                                url: string;
                            };
                            caption: string;
                            withBorder: boolean;
                            stretched: boolean;
                            withBackground: boolean;
                        }
                        return (
                            <div className={
                                cn(
                                    "w-full",
                                    "h-auto",
                                    "mt-4",
                                    "overflow-hidden",
                                    image_data.withBorder ? "border-2 border-solid border-textLight" : "",
                                    image_data.withBackground ? "bg-secondary" : "",
                                    "rounded-md",
                                )
                            }>
                                <img src={image_data.file.url} alt="image"
                                    className={cn(
                                        'w-[150%]',
                                        'm-auto',
                                        image_data.stretched ? "object-cover" : "object-contain"
                                    )} />
                                {image_data.caption && (
                                    <p className="font-sourceSerif font-medium text-center">
                                        {image_data.caption}
                                    </p>
                                )}
                            </div>)
                        defualt:
                        return null;
                }
            })
        }
        catch (err) {
            return (
                <p className='text-center font-grot text-2xl'>Couldn't fetch data;</p>
            );
        }
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            const { scrollHeight, clientHeight } = containerRef.current;
            if (scrollHeight > clientHeight) {
                setShowReadMore(true);
            } else {
                setShowReadMore(false);
            }
        }
    }, [])
    return (
        <>
            <div ref={containerRef} className={cn(
                'my-2',
                'border-b-2',
                'border-borderColor',
                showMore ? 'max-h-auto' : 'max-h-96',
                "overflow-hidden",
            )}>
                {dataBlocks(styles, data)}
            </div>
            {showReadMore && <div className='text-center cursor-pointer text-accent font-semibold' onClick={()=>setShowMore(v=>!v)}>{showMore?(<p><FaArrowUp/>Read Less</p>):(<p><FaArrowDown/>Read More</p>)}</div>}
        </>
    )
}