import { generateGhOgImage } from "../../utils/github";

interface GhOpenGraphImgProps {
  githubLink: string;
}

const GhOpenGraphImg = ({ githubLink }: GhOpenGraphImgProps): JSX.Element => {
  const { isValid, url } = generateGhOgImage(githubLink);

  return (
    <>
      {url && (
        <picture>
          <img
            alt={isValid ? "github og image" : "invalid url image"}
            src={url}
          />
        </picture>
      )}
    </>
  );
};

export default GhOpenGraphImg;
