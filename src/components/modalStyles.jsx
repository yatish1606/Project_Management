export const smallModal = {
    content : {
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)',
        minWidth            : '40%',
        minHeight           : '30%',
        borderRadius        : 10,
        boxSizing           : 'border-box',
        padding             : 0,
        transition          : '0.3s ease-in-out',
        display             : 'flex',
        flexDirection       : 'column',
        alignItems          : 'center',
        overflow            : 'hidden',
        border              : 'none'
    },
    overlay: {
	    position            : 'fixed',
		top                 : 0,
		left                : 0,
		right               : 0,
		bottom              : 0,
		backgroundColor     : '#000000ba',
		zIndex              : 9999
	},
}