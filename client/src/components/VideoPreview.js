import React, {useRef, useState, useCallback } from "react";
import Uploady from "@rpldy/uploady";
import UploadPreview from "@rpldy/upload-preview";
import UploadButton from "@rpldy/upload-button";

  const PreviewsWithClear = () => {
	const previewMethodsRef = useRef();
	const [previews, setPreviews] = useState([]);

	const onPreviewsChanged = useCallback((previews) => {
		setPreviews(previews);
	}, []);

	const onClear = useCallback(() => {
		if (previewMethodsRef.current?.clear) {
			previewMethodsRef.current.clear();
		}
	}, [previewMethodsRef]);

	return <>
		<button onClick={onClear}>
            Clear {previews.length} previews
        </button>
		<br/>		
        <UploadPreview
            rememberPreviousBatches            
            previewMethodsRef={previewMethodsRef}
            onPreviewsChanged={onPreviewsChanged}
        />            		
	</>;
};

// export const App = () => {	
// 	return <Uploady destination={{ url: "my-server.com/upload" }}>
// 		<UploadButton />
// 		<PreviewsWithClear />
// 	</Uploady>;
// };

export default PreviewsWithClear;