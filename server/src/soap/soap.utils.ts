export const errorResponseBuilder = () => {
       return ( `<soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <soap:Fault>
                <faultcode></faultcode>
                <faultstring>cfhbdjf fgsdgjhf sdjfjfgh sfhgdj</faultstring>
                <datails>
                    <message>fdskjgjdskgdsjk</message>
                </datails>
            </soap:Fault>
        </soap:Body>
    </soap:Envelope>`)
}


export const successResponseBuilder = () => {
    return ( `<soap:Envelope xmlns:soap="https://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <getAllUsersResponse>
                <Users>
                    <User>
                        <id>1</id>
                        <name>"test"</name>
                    </User>
                    <User>
                        <id>2</id>
                        <name>"test1"</name>
                    </User>
                </Users>
            </getAllUsersResponse>
        </soap:Body>
    </soap:Envelope>`)
}