const ORDER_STATUS={
    PLACED:"PLACED",
    ACCEPTED:"ACCEPTED",
    PREPARING:"PREPARING",
    DELIVERED:"DELIVERED"
}

const allowTranscations={
    PLACED:["ACCEPTED"],
    ACCEPTED:["PREPARING"],
    PREPARING:["DELIVERED"],
    DELIVERED:[],
}

module.exports={ORDER_STATUS,allowTranscations}