import './ImageLinkForm.css';

const ImageLinkForm = ({onButtonSubmit, name, loadImg }) => {
    return(
        <div>
            <p className='f2'>
                Hello <span className='ttu b br2 dark-pink'>{name}</span>
            </p>
            <p className='f3'>
                This app detect faces in pictures.
            </p>
            <div className='center flex-column'>
                <div className='form center pa4 br4 bg-dark-pink o-80 bb br bw1 b--light-pink' >
                    <input className='f4 pa2 w-70 center bg-dark-gray white br3 b' type='file' id='face-image' accept="image/*" />
                    <button className='w-20 grow f5 link ph3 pv2 ma1 dib near-white bg-hot-pink br2 ba  bw1 b--hot-pink b' onClick={ onButtonSubmit }>Detect</button>
                </div>
                <div className='center pa1 flex-column'>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;