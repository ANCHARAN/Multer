
interface ImageContainerProps {
  imgarr: string[];
}

export default function ImageContainer({imgarr}:ImageContainerProps)
{
  return (
    <div>
        {imgarr.map((i,index)=>{
        return (
          <img
            key={index}
            src={i}
            alt={`Preview ${index}`}
            height={200}
            width={200}
            style={{ margin: '10px' }}
          />
        )})}
    </div>
  );
};

