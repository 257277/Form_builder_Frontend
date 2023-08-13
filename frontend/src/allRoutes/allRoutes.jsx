import CreateForm from "../pages/createForm"
import {Routes,Route} from "react-router-dom"
import SubmitForm from "../pages/submitForm"
export default function AllRoutes()
{
    return (
    <div>
<Routes>
    <Route path="/" element={<CreateForm/>}/>
    <Route path="/submit" element={<SubmitForm/>}/>
</Routes>
</div>
    )
}