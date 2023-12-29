import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import InfoCardModal from './ListModal';

const ListPage = () => {
    const [data, setData] = useState([]);
    const [dataPer, setDataPer] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data from your API or source
    useEffect(() => {
        // Replace this with your actual API endpoint or data fetching logic
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3045/api');
                console.log("list ", response);
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const openModal = (item) => {
        setDataPer(item)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Layout>
                <div class="flex flex-col">
                    <div class="flex flex-col rounded-[10px] border-[1px] border-gray-200 p-4 bg-gray-100 bg-clip-border shadow-md shadow-[#F3F3F3]">
                        <div class="flex items-center justify-between rounded-t-3xl p-3 w-full">
                            <div class="text-lg font-bold text-navy-700">
                                List All Record
                            </div>
                        </div>
                        {data.map((item) => (
                            <div key={item._id.$oid} class="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-black/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 bg-navy-800 hover:!bg-navy-700">
                                <div class="flex items-center gap-3">
                                    <div class="flex h-16 w-16 items-center justify-center">
                                        {item.status}
                                    </div>
                                    <div class="flex flex-col">
                                        <h5 class="text-base font-bold text-navy-700">
                                        {item.url}
                                        </h5>
                                        <p class="mt-1 text-sm font-normal text-gray-600">
                                        Time: {Date.parse(item.time)} ms
                                        </p>
                                    </div>
                                </div>
                                <div class="flex w-16 h-16 items-center justify-center hover:text-navy-900 honer:bg-navy-700" onClick={() => openModal(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 5-12-5-12z" /></svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>

            {isModalOpen && (
                <InfoCardModal data={dataPer} onClose={closeModal} />
            )}
        </>
    );
};

export default ListPage;
