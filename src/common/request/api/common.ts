export default {
	"Public_GetConfig": {
		method: "GET",
        api: "/public/getConfig",
        header: {}, 
	},
    "Public_Upload": {
        api: "/public/uploadFile",
        header: {

        }
    },
    "Public_UploadMore": {
        api: "/public/uploadMoreFile",
        header: {
            
        },
        uploadOption: {
            count: 9
        }
    }
}