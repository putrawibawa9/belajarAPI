const respon = (kodeStatus,data, pesan, res) =>{
    res.json(kodeStatus, [
      {
        payload: data,
        pesan,
        metadata: {
          prev: "",
          next: "",
          current: "",
        },
      },
    ]);
}

module.exports = respon