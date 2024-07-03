import { Navigate, Route } from 'react-router-dom';
import Logout from '../Logout';
import AdminSideBar from './AdminSideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import AddSubjects from './subjectRelated/AddSubjects';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ShowTeachers from './teacherRelated/ShowTeachers';
import ViewTeacher from './teacherRelated/ViewTeacher';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import DashboardLayout from '../../components/DashboardLayout';
import AddClassRoutine from './classRoutineRelated/AddClassRoutine';
import ShowClassRoutines from './classRoutineRelated/ShowClassRoutines';
import ShowExamGroup from './examinationRelated/ShowExamGroup';
import ShowExamSchedule from './examinationRelated/ShowExamSchedule';
import AddExamGroup from './examinationRelated/AddExamGroup';
import AddExamSchedule from './examinationRelated/AddExamSchedule';
import AddExamination from './examinationRelated/AddExamination';
import ShowExaminations from './examinationRelated/ShowExaminations';
import ShowAdmitCards from './admitCardRelated/ShowAdmitCards';
import AddAdmitCard from './admitCardRelated/AddAdmitCard';
import ChooseStudents from './ChooseStudents';
import PrintAdmitCard from './admitCardRelated/PrintAdmitCard';
import AddSections from './sectionRelated/AddSections';
import ShowSections from './sectionRelated/ShowSections';
import AddSubjectGroup from './subjectGroupRelated/AddSubjectGroup';
import ShowSubjectGroups from './subjectGroupRelated/ShowSubjectGroups';
import AddMarksGrade from './marksRelated/AddMarksGrade';
import ShowMarksGrade from './marksRelated/ShowMarksGrade';
import AddMarksDivision from './marksRelated/AddMarksDivision';
import ShowMarksDivision from './marksRelated/ShowMarksDivision';
import ShowExaminationSubjects from './examinationRelated/ShowExaminationSubjects';
import ProvideExamSubjectMarks from './examinationRelated/ProvideExamSubjectMarks';
import ShowExamResult from './examinationRelated/ShowExamResult';
import ShowTeacherRoutines from './classRoutineRelated/ShowTeacherRoutines';
import AssignClassTeacher from './teacherRelated/AssignClassTeacher';
import ShowAssignedClassTeacher from './teacherRelated/ShowAssignedClassTeacher';
import ShowExaminationStudents from './examinationRelated/ShowExaminationStudents';
import ShowMarkSheets from './marksheetsRelated/ShowMarkSheets';
import AddMarkSheet from './marksheetsRelated/AddMarkSheet';
import PrintMarkSheet from './marksheetsRelated/PrintMarkSheet';
import FrontOffice from './frontOfficeRelated/FrontOffice';
import AddPurposes from './frontOfficeRelated/purposeRelated/AddPurposes';
import AddSources from './frontOfficeRelated/sourceRelated/AddSources';
import AddReferences from './frontOfficeRelated/referenceRelated/AddReferences';
import AddComplaintTypes from './frontOfficeRelated/complaintTypeRelated/AddComplaintTypes';
import AddVisitor from './frontOfficeRelated/visitorRelated/AddVisitor';
import ShowVisitors from './frontOfficeRelated/visitorRelated/ShowVisitors';
import ShowAdmissionEnquiries from './frontOfficeRelated/admissionEnquiryRelated/ShowAdmissionEnquiries';
import AddAdmissionEnquiry from './frontOfficeRelated/admissionEnquiryRelated/AddAdmissionEnquiry';
import AddPhoneCallLog from './frontOfficeRelated/phoneCallLogRelated/AddPhoneCallLog';
import ShowPhoneCallLogs from './frontOfficeRelated/phoneCallLogRelated/ShowPhoneCallLogs';
import AddItemCategories from './inventoryRelated/AddItemCategories';
import ShowItemCategories from './inventoryRelated/ShowItemCategories';
import AddItem from './inventoryRelated/AddItem';
import ShowItems from './inventoryRelated/ShowItems';
import ShowGeneratedRanks from './examinationRelated/ShowGeneratedRanks';
import AddPostal from './frontOfficeRelated/postalRelated/AddPostal';
import ShowPostal from './frontOfficeRelated/postalRelated/ShowPostal';
import RecordIssueItem from './inventoryRelated/RecordIssueItem';
import ShowIssuedItems from './inventoryRelated/ShowIssuedItems';
import AddItemStore from './inventoryRelated/AddItemStore';
import ShowItemStore from './inventoryRelated/ShowItemStore';
import AddItemSupplier from './inventoryRelated/AddItemSupplier';
import ShowItemSuppliers from './inventoryRelated/ShowItemSuppliers';
import AddItemStock from './inventoryRelated/AddItemStock';
import ShowItemStocks from './inventoryRelated/ShowItemStocks';
import AddHostel from './hostelRelated/AddHostel';
import ShowHostels from './hostelRelated/ShowHostels';
import AddRoomTypes from './hostelRelated/AddRoomTypes';
import ShowRoomTypes from './hostelRelated/ShowRoomTypes';
import AddHostelRoom from './hostelRelated/AddHostelRoom';
import ShowHostelRooms from './hostelRelated/ShowHostelRooms';
import Addincome from '../Income/Addincome';
import Searchincome from "../Income/Searhincome"
import Booklist from '../../pages/Library/Booklist';
import Issuereturn from '../../pages/Library/Issuereturn';
import Addstudent from '../../pages/Library/Addstudent';
import Addstaffmember from '../../pages/Library/Addstaffmember';
import Incomehead from '../Income/Incomehead';
import AddHomework from './homeworkRelated/AddHomework';
import ShowHomeworks from './homeworkRelated/ShowHomeworks';
import ShowDailyAssignments from './homeworkRelated/ShowDailyAssignments';
import AddStudentHouses from './studentRelated/AddStudentHouses';
import ShowStudentHouses from './studentRelated/ShowStudentHouses';
import Approveleave from '../attendance/Approveleave';
import Periodattendance from '../attendance/Periodattendance';
import Attendancebydate from '../attendance/Attendancebydate';
import Collectfee from '../Feecollection/Collectfee';
import Offlinepay from '../Feecollection/Offlinepay';
import Searchfeepay from '../Feecollection/Searchfeepay';
import Duefees from '../Feecollection/Duefees';
import Feemaster from '../Feecollection/Feemaster';
import Feegroup from '../Feecollection/Feegroup';
import Feetype from '../Feecollection/Feetype';
import Feediscount from '../Feecollection/Feediscount';
import Feecarryfor from '../Feecollection/Feecarryfor';
import Feereminder from '../Feecollection/Feereminder';
import Transfeemaster from '../Transport/Transfeemaster';
import Pickuppoint from '../Transport/Pickuppoint';
import Routes from '../Transport/Routes';
import Vehicles from '../Transport/Vehicles';
import Assignveh from '../Transport/Assignveh';
import Routepickpoint from '../Transport/Routepickpoint';
import Studenttranfee from '../Transport/Studenttranfee';
const AdminDashboard = () => {
    const menuRole = "Admin"

    return (
        <DashboardLayout
            dashboardTitle={menuRole}
            menuRole={menuRole}
            SidebarComponent={AdminSideBar}
        >
            <Route path="/" element={<AdminHomePage />} />
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/Admin/dashboard" element={<AdminHomePage />} />
            <Route path="/Admin/profile" element={<AdminProfile />} />
            {/* <Route path="/Admin/complaints" element={<SeeComplains />} /> */}

            {/*__________________________________________*/}
            {/*                ACADEMICS                 */}
            {/*__________________________________________*/}
            <>
                {/* Subject */}
                <Route path="/Admin/subjects" element={<ShowSubjects />} />
                <Route path="/Admin/subjects/subject/:subjectID" element={<ViewSubject />} />

                <Route path="/Admin/subjects/add" element={<AddSubjects />} />

                <Route path="/Admin/class/subject/:subjectID" element={<ViewSubject />} />
                <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                {/* Class Routine*/}
                <Route path="/Admin/classRoutine" element={<ShowClassRoutines />} />
                <Route path="/Admin/classRoutine/add" element={<AddClassRoutine />} />

                <Route path="/Admin/teacherTimetable" element={<ShowTeacherRoutines />} />

                {/* Class */}
                <Route path="/Admin/classes/add" element={<AddClass />} />
                <Route path="/Admin/classes" element={<ShowClasses />} />
                <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                {/* <Route path="/Admin/class/addstudents/:classID" element={<AddStudent situation="Class" />} /> */}

                {/* Section */}
                <Route path="/Admin/sections/add" element={<AddSections />} />
                <Route path="/Admin/sections" element={<ShowSections />} />

                {/* Subject Group */}
                <Route path="/Admin/subjectGroups/add" element={<AddSubjectGroup />} />
                <Route path="/Admin/subjectGroups" element={<ShowSubjectGroups />} />

                {/* Teacher */}

                <Route path="/Admin/teachers" element={<ShowTeachers />} />
                <Route path="/Admin/teachers/add" element={<AddTeacher />} />
                <Route path="/Admin/teachers/teacher/:id" element={<ViewTeacher />} />

                {/* Class Teachers */}
                <Route path="/Admin/classTeachers" element={<ShowAssignedClassTeacher />} />
                <Route path="/Admin/classTeachers/assignClassTeacher" element={<AssignClassTeacher />} />
            </>

            {/*__________________________________________*/}
            {/*            STUDENT INFORMATION           */}
            {/*__________________________________________*/}

            <>
                {/* Student */}
                <Route path="/Admin/students" element={<ShowStudents />} />
                <Route path="/Admin/students/student/:id" element={<ViewStudent />} />

                <Route path="/Admin/studentAdmission" element={<AddStudent situation="Student" />} />

                <Route path="/Admin/studentHouses/add" element={<AddStudentHouses />} />
                <Route path="/Admin/studentHouses" element={<ShowStudentHouses />} />

                <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />
            </>

            {/*__________________________________________*/}
            {/*              FRONT OFFICE                */}
            {/*__________________________________________*/}

            <>
                {/* Setup Front Office */}
                <Route path="/Admin/frontOffice" element={<FrontOffice />} />
                <Route path="/Admin/frontOffice/purposes/add" element={<AddPurposes />} />
                <Route path="/Admin/frontOffice/complaintTypes/add" element={<AddComplaintTypes />} />
                <Route path="/Admin/frontOffice/sources/add" element={<AddSources />} />
                <Route path="/Admin/frontOffice/references/add" element={<AddReferences />} />

                <Route path="/Admin/visitors/add" element={<AddVisitor />} />
                <Route path="/Admin/visitors" element={<ShowVisitors />} />

                <Route path="/Admin/admissionEnquiries/add" element={<AddAdmissionEnquiry />} />
                <Route path="/Admin/admissionEnquiries" element={<ShowAdmissionEnquiries />} />

                <Route path="/Admin/phoneCallLogs/add" element={<AddPhoneCallLog />} />
                <Route path="/Admin/phoneCallLogs" element={<ShowPhoneCallLogs />} />

                <Route path="/Admin/postalDispatch/add" element={<AddPostal postalType="Dispatch" />} />
                <Route path="/Admin/postalDispatch" element={<ShowPostal postalType="Dispatch" />} />

                <Route path="/Admin/postalReceive/add" element={<AddPostal postalType="Receive" />} />
                <Route path="/Admin/postalReceive" element={<ShowPostal postalType="Receive" />} />
            </>

            {/*__________________________________________*/}
            {/*                EXAMINATIONS              */}
            {/*__________________________________________*/}

            <>
                {/* Exam Group */}

                <Route path="/Admin/examGroups" element={<ShowExamGroup />} />
                <Route path="/Admin/examGroups/exams/add/:examGroup" element={<AddExamination />} />
                <Route path="/Admin/examGroups/exams/:examGroup" element={<ShowExaminations />} />
                <Route path="/Admin/examGroups/exams/students/:examGroup/:examinationType/:sessionYear" element={<ShowExaminationStudents />} />
                <Route path="/Admin/examGroups/exams/schedule/:examGroup/:examinationType/:sessionYear" element={<ShowExaminationSubjects schedule={true} />} />
                <Route path="/Admin/examGroups/exams/subjects/:examGroup/:examinationType/:sessionYear" element={<ShowExaminationSubjects schedule={false} />} />
                <Route path="/Admin/examGroups/exams/generateRank/:examGroup/:examinationType/:sessionYear" element={<ShowGeneratedRanks />} />
                <Route path="/Admin/examGroups/exams/subjects/students/:examinationType/:examSubjectName/:examSubjectID/:sessionYear" element={<ProvideExamSubjectMarks />} />
                <Route path="/Admin/examGroups/add" element={<AddExamGroup />} />

                {/* Exam Schedule */}

                <Route path="/Admin/examSchedule" element={<ShowExamSchedule />} />
                <Route path="/Admin/examSchedule/add" element={<AddExamSchedule />} />

                <Route path="/Admin/examResult" element={<ShowExamResult />} />

                {/* Admit Card */}

                <Route path="/Admin/admitCards" element={<ShowAdmitCards />} />
                <Route path="/Admin/admitCards/add" element={<AddAdmitCard />} />
                <Route path="/Admin/admitCards/admitCard/print/:acID/:examinationID" element={<ChooseStudents path="/Admin/admitCards/admitCard/print/student" type="choose" />} />
                <Route path="/Admin/admitCards/admitCard/print/student/:studentID/:acID/:examinationID" element={<PrintAdmitCard />} />

                {/* Marksheet */}

                <Route path="/Admin/markSheets" element={<ShowMarkSheets />} />
                <Route path="/Admin/markSheets/add" element={<AddMarkSheet />} />
                <Route path="/Admin/markSheets/markSheet/print/:acID/:examinationID" element={<ChooseStudents path="/Admin/markSheets/markSheet/print/student" type="choose" />} />
                <Route path="/Admin/markSheets/markSheet/print/student/:studentID/:acID/:examinationID" element={<PrintMarkSheet />} />

                {/* Marks Related */}

                <Route path="/Admin/marksGrade/add" element={<AddMarksGrade />} />
                <Route path="/Admin/marksGrade" element={<ShowMarksGrade />} />

                <Route path="/Admin/marksDivision/add" element={<AddMarksDivision />} />
                <Route path="/Admin/marksDivision" element={<ShowMarksDivision />} />
            </>

            {/*__________________________________________*/}
            {/*                INVENTORY                 */}
            {/*__________________________________________*/}

            <>
                <Route path="/Admin/itemCategories/add" element={<AddItemCategories />} />
                <Route path="/Admin/itemCategories" element={<ShowItemCategories />} />

                <Route path="/Admin/items/add" element={<AddItem />} />
                <Route path="/Admin/items" element={<ShowItems />} />

                <Route path="/Admin/issuedItems/add" element={<RecordIssueItem />} />
                <Route path="/Admin/issuedItems" element={<ShowIssuedItems />} />

                <Route path="/Admin/itemStore/add" element={<AddItemStore />} />
                <Route path="/Admin/itemStore" element={<ShowItemStore />} />

                <Route path="/Admin/itemSuppliers/add" element={<AddItemSupplier />} />
                <Route path="/Admin/itemSuppliers" element={<ShowItemSuppliers />} />

                <Route path="/Admin/itemStocks/add" element={<AddItemStock />} />
                <Route path="/Admin/itemStocks" element={<ShowItemStocks />} />
            </>

            {/*__________________________________________*/}
            {/*                HOSTEL                    */}
            {/*__________________________________________*/}

            <>
                <Route path="/Admin/hostels/add" element={<AddHostel />} />
                <Route path="/Admin/hostels" element={<ShowHostels />} />

                <Route path="/Admin/roomTypes/add" element={<AddRoomTypes />} />
                <Route path="/Admin/roomTypes" element={<ShowRoomTypes />} />

                <Route path="/Admin/hostelRooms/add" element={<AddHostelRoom />} />
                <Route path="/Admin/hostelRooms" element={<ShowHostelRooms />} />
            </>

            {/*__________________________________________*/}
            {/*              HOMEWORK                    */}
            {/*__________________________________________*/}

            <>
                <Route path="/Admin/homeworks/add" element={<AddHomework />} />
                <Route path="/Admin/homeworks" element={<ShowHomeworks />} />

                <Route path="/Admin/dailyAssignments" element={<ShowDailyAssignments />} />

            </>

            {/*__________________________________________*/}
            {/*                Library                   */}
            {/*__________________________________________*/}
            <Route path="/Booklist" element={<Booklist />} />
            <Route path="/issuereturn" element={<Issuereturn />} />
            <Route path="/addstudent" element={<Addstudent />} />
            <Route path="/addstaffmember" element={<Addstaffmember />} />

            {/*__________________________________________*/}
            {/*               INCOME                     */}
            {/*__________________________________________*/}
            <Route path="/Addincome" element={<Addincome />} />
            <Route path="/searchincome" element={<Searchincome />} />
            <Route path="/incomehead" element={<Incomehead />} />
                {/*__________________________________________*/}
            {/*                ATTENDANCE                    */}
            {/*__________________________________________*/}
            <Route path="/approveleave" element={<Approveleave/>}/>
            <Route path="/periodattendance" element={<Periodattendance/>}/>
            <Route path="/attendancebydate" element={<Attendancebydate/>}/>
              {/*__________________________________________*/}
            {/*              FEE COLLECTION                   */}
            {/*__________________________________________*/}
            <Route path="/collectfee" element={<Collectfee/>}/>
            <Route path="/offlinepay" element={<Offlinepay/>}/>
            <Route path="/searchfeepay" element={<Searchfeepay/>}/>
            <Route path="/duefees" element={<Duefees/>}/>
            <Route path="/feemaster" element={<Feemaster/>}/>
            <Route path="/feegroup" element={<Feegroup/>}/>
            <Route path="/feetype" element={<Feetype/>}/>
            <Route path="/feediscount" element={<Feediscount/>}/>
            <Route path="/feecarryfor" element={<Feecarryfor/>}/>
            <Route path="/feereminder" element={<Feereminder/>}/>
              {/*__________________________________________*/}
            {/*             TRANSPORT                  */}
            {/*__________________________________________*/}
            <Route path="/transfeemaster" element={<Transfeemaster/>}/>
            <Route path="/pickuppoint" element={<Pickuppoint/>}/>
            <Route path="/routes" element={<Routes/>}/>
            <Route path="/vehicles" element={<Vehicles/>}/>
            <Route path="/assignveh" element={<Assignveh/>}/>
            <Route path="/routepickpoint" element={<Routepickpoint/>}/>
            <Route path="/studenttransfee" element={<Studenttranfee/>}/>

            {/*__________________________________________*/}
            {/*                OTHERS                    */}
            {/*__________________________________________*/}

            {/* Notice */}
            <Route path="/Admin/addnotice" element={<AddNotice />} />
            <Route path="/Admin/notices" element={<ShowNotices />} />

            <Route path="/logout" element={<Logout />} />
        </DashboardLayout>
    );
}
export default AdminDashboard