import { ShareIcon } from "../icons/ShareIcon";

export function Cards () {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 border">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                    <ShareIcon/>
                    </div>
                    Project Ideas
                </div>
                <div className="flex items-center">
                    <div className="text-gray-500 pr-2">
                    <ShareIcon/>
                    </div>
                    <div className="text-gray-500">
                    <ShareIcon/>
                    </div>
                </div>
            </div>
            <div className="pt-4">
            {/* <iframe className="w-full"
            src="https://www.youtube.com/embed/OX5pGI-Q26w?si=NCcQQYxAAZFu2acC" 
            title="YouTube video player" frameBorder="0" allow="accelerometer; 
            autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
            web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe> */}
            <blockquote className="twitter-tweet">
             <a href="https://twitter.com/username/status/807811447862468608"></a> 
            </blockquote>
            </div>
        </div>
    </div>
}