import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, name }) => {
    return(
        <div>
            <p className='f2'>
                Hello <span className='ttu b br2 dark-pink'>{name}</span>
            </p>
            <p className='f3'>
                This app detect faces in pictures.
            </p>
            <div className='center'>
                <article className='br4 ba dark-gray b--dark-pink bg-near-black w-80 ma3 pa2'>
                    <main className='pa1'>
                        <p className="db f3 dark-pink">INSTRUCTION: </p>
                        <p className='db f4'>Search in google images "stock face", choose an image, press right click and select copy image address, after that insert the link in input and press Detect.</p>
                        <p className='db f3 dark-red'>WARNING: </p>
                        <p className='db f4'>1: If the image does not appear, choose another image</p>
                        <p className='db f4'>2: If you choose an image with multiple faces, the app will detect only one</p>
                        <p className='db f4'>3: If the image appear, but does not appera a red box around the face please press detect again</p>
                    </main>
                </article>
            </div>
            <div className='center flex-column'>
                <div className='form center pa4 br4 bg-dark-pink o-80 bb br bw1 b--light-pink' >
                    <input className='f4 pa2 w-70 center bg-dark-gray white br3 b' type='text' placeholder = "Please insert a link" onChange={ onInputChange } />
                    <button className='w-20 grow f5 link ph3 pv2 ma1 dib near-white bg-hot-pink br2 ba  bw1 b--hot-pink b' onClick={ onButtonSubmit }>Detect</button>
                </div>
                <div className='center pa1 flex-column'>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;