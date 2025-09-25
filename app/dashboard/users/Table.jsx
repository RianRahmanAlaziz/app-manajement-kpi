'use client';
import Image from 'next/image'
import Tippy from '@tippyjs/react'; // ✅ dari React
import { CheckSquare, Trash2 } from 'lucide-react'

function Table() {
    return (
        <table className="table table-report -mt-2">
            <thead>
                <tr>
                    <th className="whitespace-nowrap">IMAGES</th>
                    <th className="whitespace-nowrap">PRODUCT NAME</th>
                    <th className="text-center whitespace-nowrap">STOCK</th>
                    <th className="text-center whitespace-nowrap">PRICE</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr className="intro-x">
                    <td className="w-40">
                        <div className="flex">
                            <div className="w-10 h-10 image-fit zoom-in">
                                <Tippy
                                    animation="shift-away"
                                    content="Uploaded at 1 September 2021"
                                    delay={[0, 100]}
                                >
                                    <Image
                                        alt="Midone - HTML Admin Template"
                                        width={32}
                                        height={32}
                                        className=" rounded-full"
                                        src="/images/preview-8.jpg" title="Uploaded at 1 September 2021" />
                                </Tippy>
                            </div>
                        </div>
                    </td>
                    <td>
                        <a href="" className="font-medium whitespace-nowrap">Samsung Q90 QLED TV</a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">Electronic</div>
                    </td>
                    <td className="text-center">54</td>
                    <td className="text-center">$97</td>
                    <td className="w-40 ">
                        <div className="flex items-center justify-center text-danger">
                            <CheckSquare className="w-4 h-4 mr-2" /> Inactive
                        </div>
                    </td>
                    <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => openModal('Add Product',
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nulla quis maxime, ducimus nostrum ea qui numquam expedita sunt labore reiciendis dicta eveniet saepe hic aliquam, alias soluta aspernatur sit dolorum voluptas aliquid optio illo! Voluptas dolor ut qui alias mollitia nihil architecto fugiat quisquam hic veritatis cumque soluta, illo sed temporibus recusandae earum nobis distinctio facere minima velit modi. Omnis ea laborum incidunt, animi porro minus nam eum excepturi aliquam, enim dicta sunt atque voluptatem quisquam nulla. Dolorem, a sed aliquam similique quasi commodi nesciunt facilis. Dignissimos, itaque temporibus consectetur laudantium et provident porro ea sequi minima maxime expedita!
                                    </p>
                                )}
                                className="flex items-center mr-3" >
                                <CheckSquare className="w-4 h-4 mr-1" />
                                Edit
                            </button>
                            <button className="flex items-center text-danger"
                                data-tw-toggle="modal" data-tw-target="#delete-confirmation-modal">
                                <Trash2 className="w-4 h-4 mr-1" /> Delete </button>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}

export default Table