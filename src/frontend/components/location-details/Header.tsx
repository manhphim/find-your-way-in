import LocationImages from "./LocationImages";
import demoImage from "../../public/images/IMG_2431.jpg";


export const Header = ({ name, src, alt }: any) => {
  return (
    <div className="h-auto text-xl text-center">
      <h1 className="text-4xl font-bold">{name}</h1>
      <LocationImages src={src} alt={alt} />
    </div>
  )
}
 export default Header;