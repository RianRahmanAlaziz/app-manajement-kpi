'use client';
import DashboardPage from '../page'
import Image from 'next/image'
import Tippy from '@tippyjs/react'; // ✅ dari React
import { CheckSquare, Trash2, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import { useState } from 'react'
import Modal from '../../../components/common/Modal';

function PageUsers() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: '',
        content: null,
    });
    const openModal = (title, content) => {
        setModalData({ title, content });
        setIsOpen(true);
    };

    return (
        <DashboardPage>
            <h2 className="intro-y text-lg font-medium pt-24">
                Product List
            </h2>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
                    <button
                        onClick={() => openModal('Add Product',
                            <div className="col-span-12 sm:col-span-12">
                                <label for="title"
                                    className="block text-sm font-medium text-gray-700 mt-2">Title
                                </label>
                                <input id="title" name="title" type="text" className="form-control"
                                    value="asd" placeholder="Title" />

                                <div className="text-danger mt-2">
                                    abcd
                                </div>

                            </div>
                        )}
                        className="btn btn-dark dark:btn-outline-dark shadow-md mr-2">Add New Product
                    </button>

                    <div className="hidden md:block mx-auto text-slate-500"></div>
                    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
                        <div className="w-56 relative text-slate-500">
                            <input type="text" className="form-control w-56 box pr-10" placeholder="Search..." />
                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"></i>
                        </div>
                    </div>
                </div>

                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
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
                                        <Tippy
                                            animation="shift-away"
                                            content="Uploaded at 1 September 2021"
                                            delay={[0, 100]}
                                        >
                                            <div className="w-10 h-10 image-fit zoom-in">
                                                <Image
                                                    alt="Midone - HTML Admin Template"
                                                    width={32}
                                                    height={32}
                                                    className=" rounded-full"
                                                    src="/images/preview-8.jpg" title="Uploaded at 1 September 2021" />
                                            </div>
                                        </Tippy>
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
                                            onClick={() => openModal('Edit Product',
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
                </div>

                <div className="intro-y col-span-12 flex justify-center items-center mt-5">
                    <nav className="w-auto">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <ChevronsLeft className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    <ChevronLeft className="w-4 h-4" />
                                </a>
                            </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">1</a> </li>
                            <li className="page-item active"> <a className="page-link" href="#">2</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">3</a> </li>
                            <li className="page-item"> <a className="page-link" href="#">...</a> </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <ChevronRight className="w-4 h-4" /> </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#"> <ChevronsRight className="w-4 h-4" /> </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={modalData.title}
            >
                {modalData.content}
            </Modal>
        </DashboardPage>
    )
}

export default PageUsers