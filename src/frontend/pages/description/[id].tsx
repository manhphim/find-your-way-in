import Header from '../../components/location-details/Header';
import Paragraph from '../../components/location-details/Paragraph';
import Schedule from '../../components/location-details/Schedule';
import ContactDetails from '../../components/location-details/ContactDetails';
import React from 'react';
import Layout from '@components/global/Layout';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_FEEDFACTORY_API_KEY;

export async function getStaticPaths() {
    const res = await fetch(`${apiUrl}/locations`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
    });
    const data = await res.json();
    const dataArray = data.results;
    const paths = dataArray.map((location: any) => {
        return {
            params: { id: location.id },
        };
    });

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context: { params: { id: string } }) {
    const id = context.params.id;
    const res = await fetch(`${apiUrl}/locations/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
    });
    const data = await res.json();

    return {
        props: {
            data: data,
        },
    };
}

export const Details = ({ data }: any): JSX.Element => {
    console.log(data);
    const [locationName, setLocationName] = React.useState(null);
    const [description, setDescription] = React.useState(null);
    const [calendar, setCalendar] = React.useState(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [imgAlt, setImgAlt] = React.useState<any>(null);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    React.useEffect(() => {
        if (data.calendar.patternDates[0]) {
            setCalendar(data.calendar.patternDates[0].opens);
        }

        //api data for name of the location
        setLocationName(data.location.label);

        //api data for the description of the place
        setDescription(data.trcItemDetails[0].longdescription);

        //image of the place is caught here
        if (data.files[0]) {
            setImgSrc(data.files[0].hlink);
        }

        setImgAlt('alt');

        //phone number of the place is put here
        setPhoneNumber(data.contactinfo.phone.number);

        //email address for the place is put here
        setEmail(data.contactinfo.mail.email);
    }, [data]);

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full h-full mb-1 space-y-4">
                <div className="w-auto p-2 mt-20 space-y-3">
                    <>
                        {imgSrc && imgAlt && (
                            <Header
                                name={locationName}
                                src={imgSrc}
                                alt={imgAlt}
                            />
                        )}

                        <Paragraph content={description} />

                        {calendar && <Schedule calendar={calendar} />}

                        {phoneNumber && email ? (
                            <ContactDetails
                                phoneNumber={phoneNumber}
                                email={email}
                            />
                        ) : (
                            <ContactDetails phoneNumber="" email="" />
                        )}
                    </>
                </div>
            </div>
        </Layout>
    );
};

export default Details;
