import { useState, useEffect, useRef } from "preact/hooks";
import { useScreenshot } from 'use-react-screenshot'
import './style.css';
import { saveImage } from '../../utils/sendRequest'
import { ENV } from "../../../config/config";
const { allowedImageTypes } = ENV

export default function UserInput() {

	const [inputText, setInputText] = useState('');
	const [imageFile, setImageFile] = useState();
	const [submitted, setSubmitted] = useState(false);
	const [imageDimensions, setDimensions] = useState({})
	const [screenshot, takeScreenshot] = useScreenshot()
	const divRef = useRef()

	const setImageFileHandler = (file) => {
		let fileExtension = file.name.split('.').pop()
		if (allowedImageTypes.indexOf(fileExtension) === -1) {
			alert(`Invalid File Type. Allowed File Types are : ${allowedImageTypes.join(' , ')}`)
			return
		}
		setImageFile(file)

		// display image
		let newURL = URL.createObjectURL(file);
		let textDiv = document.getElementById('textDiv')
		if (textDiv) {
			textDiv.style.backgroundImage = `url("${newURL}")`;
		}

		// get image deimensions
		let image = new Image();
		image.src = newURL
		image.onload = function () {
			setDimensions({ width: image.naturalWidth, height: image.naturalHeight })
		};
	}

	const submit = () => {
		if (inputText && imageFile) {
			takeScreenshot(divRef.current)
			setSubmitted(true)
		}
		else {
			alert('No changes found to be saved!')
		}

	}

	useEffect(() => {
		if (submitted && screenshot) {
			let payload = {
				fileExt: imageFile.name.split('.').pop(),
				image: screenshot
			}

			saveImage(payload, resetStates)
		}
	}, [submitted, screenshot])

	const resetStates = () => {
		setImageFile()
		setInputText('')
		setSubmitted(false)

		let textDiv = document.getElementById('textDiv')
		if (textDiv) {
			textDiv.style.backgroundImage = ``;
		}

	}

	return (

		<div className="home">
			<div className="form-holder">
				<div className="resource">
					<label>Enter Text</label>&nbsp;&nbsp;
					<input type={'text'} value={inputText} onChange={(e) => setInputText(e.target.value)} />
				</div>
				<div className="resource input-file-row">
					<div className="input-file-holder">
						<input type={'file'} value={imageFile} id="image" onChange={(e) => setImageFileHandler(e.target.files[0])} />
						<span className="input-file-text">Choose File</span>
					</div>
					<span className="uploaded-file-name">{imageFile?.name}</span>
				</div>
				<div className="resource">
					<span>Allowed Image Types : {allowedImageTypes.join(' , ')}</span>
				</div>
				<div className="btn-holder">
					{inputText && imageFile &&
						<div>
							<button type="button" onClick={submit}>Submit</button>
						</div>
					}
				</div>
			</div>
			<div className="text-image-div">
				<h2>Preview:</h2>
				<div id="textDiv" className="text-div" style={{ backgroundSize: imageDimensions?.width == imageDimensions?.height ? "cover" : "contain" }} ref={divRef}>
					{inputText &&
						<div className="">
							<p>{inputText}</p>
						</div>
					}
				</div>
			</div>
		</div>
	);
}
