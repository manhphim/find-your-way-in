import React, { useState } from 'react';
import Categories from './Categories';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBicycle,
    faBuildingColumns,
    faSquareParking,
    faRestroom,
    faUtensils,
    faAnglesDown,
    faAnglesUp,
    faBagShopping,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export default function SliderMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const categories = [
        { iconName: faBagShopping, nameOfCategory: 'Shop' },
        { iconName: faUtensils, nameOfCategory: 'Eat/Drink' },
        { iconName: faBicycle, nameOfCategory: 'Sport' },
        { iconName: faBuildingColumns, nameOfCategory: 'Culture' },
    ];

    const { t } = useTranslation('common');

    return (
        <>
            {!isOpen ? (
                <div className="flex justify-center bg-transparent ">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex justify-center w-12 h-5 font-bold text-white bg-green-500 rounded-b-full hover:bg-green-700"
                    >
                        {' '}
                        <FontAwesomeIcon
                            icon={faAnglesDown}
                            size="sm"
                            className="flex justify-center mt-1 text-white "
                        />
                    </button>
                </div>
            ) : (
                <>
                    {' '}
                    <div
                        className={`drop-shadow-md   ${
                            isOpen ? 'translate-y-0' : 'translate-y-full'
                        } transition-transform duration-600`}
                    >
                        <div className="flex justify-center p-2 bg-gray-50">
                            <p className="text-xl font-bold">{t('category')}</p>
                        </div>
                        <div className="grid h-auto grid-cols-3 gap-6 p-4 bg-gray-50 rounded-b-2xl">
                            <Categories categories={categories} />
                        </div>

                        <div className="flex justify-center ">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex justify-center w-12 h-5 font-bold text-white bg-green-500 rounded-b-full hover:bg-green-700 drop-shadow-md"
                            >
                                <FontAwesomeIcon
                                    icon={faAnglesUp}
                                    size="sm"
                                    className="flex justify-center mt-1 text-white "
                                />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
