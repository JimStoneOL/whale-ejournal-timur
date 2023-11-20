import { Redirect, Route, Switch } from "react-router-dom"
import { AuthPage } from "../../component/auth/AuthPage"
import { EstimationByStudent } from "../../component/estimation/EstimationByStudent"
import { StudentHome } from "../../component/student/StudentHome"
import { SubjectHome } from "../../component/subject/SubjectHome"
import { About } from "../component/About"
import { TeacherInfo } from "../../component/about/TeacherInfo"
import { StudentInfo } from "../../component/about/StudentInfo"
import { BookPage } from "../../component/about/BookPage"
import { LessonPage } from "../../component/about/LessonPage"

export const useRoutes=(isAuthenticated,role)=>{
   
    if(isAuthenticated){
        return(
          <Switch>
             <Route path="/" exact>
                    <StudentHome/>
                </Route>
                  <Route path="/subject" exact>
                    <SubjectHome/>
                </Route>
                <Route path="/about" exact>
                    <About/>
                </Route>
                <Route path="/estimation/:id" exact>
                    <EstimationByStudent/>
                </Route>

                <Route path="/iteacher" exact>
                    <TeacherInfo/>
                </Route>

                <Route path="/istudent" exact>
                    <StudentInfo/>
                </Route>

                <Route path="/book" exact>
                    <BookPage/>
                </Route>

                <Route path="/lesson" exact>
                    <LessonPage/>
                </Route>
                <Redirect to="/" />
        </Switch>
        )
    }
 else{
        return(
            <Switch>
            <Route path="/" exact>
              <AuthPage/>  
            </Route>
            <Redirect to="/" />
        </Switch>
        )
}
}