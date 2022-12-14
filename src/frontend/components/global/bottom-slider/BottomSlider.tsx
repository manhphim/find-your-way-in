import React, { useEffect } from 'react';
import ImageContainer from './ImageContainer';
import RoutingButton from './RoutingButton';
import InfoButton from './InfoButton';
import Body from './Body';
import { useRouter } from 'next/router';
import brokenImage from '../../../public/images/broken.png';
import CloseButton from './CloseButton';

const BottomSlider = ({
    destinationCoords,
    setDirections,
    currentUserLocation,
    id,
    header,
    description,
    image,
    handleCloseBottomSlider,
}: any): JSX.Element => {
    const router = useRouter();
    useEffect(() => {
        return () => {
            console.log('unmounting');
        };
    }, []);

    const fetchDirections = (destinationCoords: any) => {
        if (!destinationCoords) return;

        const service = new google.maps.DirectionsService();

        service.route(
            {
                origin: currentUserLocation,
                destination: destinationCoords,
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    setDirections(result);
                }
            },
        );
    };

    return (
        <div
            id="bottomSlider"
            data-cy="bottomSlider"
            className="absolute bottom-0 left-0 right-0 w-full rounded-t-lg shadow-bottom-slider bg-gray-50"
        >
            <ImageContainer
                src={image ? image : brokenImage}
                alt="background"
            />
            <Body header={header} description={description} />
            <div className="flex justify-around">
                <RoutingButton
                    onClick={() => {
                        fetchDirections(destinationCoords);
                    }}
                />
                <InfoButton onClick={() => router.push(`description/${id}`)} />
                <CloseButton onClick={handleCloseBottomSlider} />
            </div>
        </div>
    );
};

export default BottomSlider;
