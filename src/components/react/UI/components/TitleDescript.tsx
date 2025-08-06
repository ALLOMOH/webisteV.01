import DecryptedText from "../Text/DecryptedText";
import ShinyText from "../Text/ShinyText";

type titleDescriptProst = {
    title:string,
    descript?:string
    className?:React.ReactNode
}

export default function TitleDescript(prost: titleDescriptProst){

    const { title, descript,className } = prost;

    let world :string[] = title.split(' ');
    
    const firstWord = world[0];
    const lastPhases :string = title.substring(firstWord.length,title.length);
    const basecss :string = "text-center"
    return(
        <div className={ `${basecss}  ${className}`}>
            <h2 className=" text-2xs md:text-5xl lg:text-5x text-white font-bold sm:text-2xs mb-3">
                <DecryptedText speed={.2} sequential={true} animateOn="view" text ={firstWord.substring(0,1).toUpperCase() + firstWord.substring(1)} /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f1ca13] to-[#ff7f11]"><DecryptedText speed={2} sequential={true} animateOn="view" text={ lastPhases.substring(0,2).toUpperCase() + lastPhases.substring(2)}/></span>
            </h2>
            <p className="text-xs md:text-xl text-gray-300 max-w-3xl mx-auto">
                <ShinyText splitType="lines" text={descript??''}/>
            </p>
        </div>
    );
}