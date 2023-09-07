import assetsFolder from "../utils/publicfolder"

const cssFonts = `
  @font-face {
    font-family: AlesandBold;
    src: url(${assetsFolder}/fonts/Alesand/AlesandBold.ttf);
  }

  @font-face {
    font-family: Alesand;
    src: url(${assetsFolder}/fonts/Alesand/AlesandRegular.ttf);
  }

  @font-face {
    font-family: CodeBold;
    src: url(${assetsFolder}/fonts/CodeBold/CodeBold.otf);
  }

  @font-face {
    font-family: CodeLight;
    src: url(${assetsFolder}/fonts/CodeBold/CodeLight.otf);
  }

  @font-face {
    font-family: 'Metropolis';
    src: url(${assetsFolder}/fonts/Metropolis/Metropolis-Medium.otf);
    font-weight: normal;
    font-style: normal;
  }
`

const Fonts = () => {
  return (
    <style>
      {
        cssFonts
      }
    </style>
  )
}

export default Fonts
