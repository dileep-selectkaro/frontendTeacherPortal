import * as React from 'react';
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ListDropdownComponent, ListItemButtonHomeTemplate, ListItemButtonTemplate } from '../../components/SidebarTemplate';
import {
    AccessTimeFilled, AccountCircle, Api,
    Book,
    Business, CollectionsBookmark, ContactPhone, DomainAdd, FolderShared,
    Grading, HomeWork, Inventory, ListAlt, MailOutline, MarkAsUnread,
    Notes, PersonAdd, PersonOff, PhoneInTalk, PresentToAll,
    Schedule, SchoolOutlined, StickyNote2Outlined,
    Store,
    Topic, ViewTimeline, Workspaces
} from '@mui/icons-material';
import StyleIcon from '@mui/icons-material/Style';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const AdminSideBar = () => {
    return (
        <React.Fragment>
            <ListItemButtonHomeTemplate
                textProp="Home"
                iconProp={HomeIcon}
                pathProp="/Admin/dashboard"
                linkProp=""
            />

            {/*__________________________________________*/}
            {/*                ACADEMICS                 */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Academics"
                iconProp={SchoolOutlined}
                styleProp={7.7}
            >
                <ListItemButtonTemplate
                    textProp="Class Timetable"
                    iconProp={AccessTimeFilled}
                    pathProp="/Admin/classRoutine"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Teacher Timetable"
                    iconProp={Schedule}
                    pathProp="/Admin/teacherTimetable"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Assign Class Teacher"
                    iconProp={SensorOccupiedIcon}
                    pathProp="/Admin/classTeachers"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Subject Group"
                    iconProp={Workspaces}
                    pathProp="/Admin/subjectGroups"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Subjects"
                    iconProp={AssignmentIcon}
                    pathProp="/Admin/subjects"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Classes"
                    iconProp={ClassOutlinedIcon}
                    pathProp="/Admin/classes"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Sections"
                    iconProp={Api}
                    pathProp="/Admin/sections"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Teachers"
                    iconProp={SupervisorAccountOutlinedIcon}
                    pathProp="/Admin/teachers"
                    linkProp=""
                />

            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*            STUDENT INFORMATION           */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Student Information"
                iconProp={PersonIcon}
                styleProp={0.0}
            >
                <ListItemButtonTemplate
                    textProp="Student Details"
                    iconProp={AccountCircle}
                    pathProp="/Admin/students"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Student Admission"
                    iconProp={PersonAdd}
                    pathProp="/Admin/studentAdmission"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Student House"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/studentHouses"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Disabled Students"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/disabledStudents"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Multi Class Student"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/multiClassStudent"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Bulk Delete"
                    iconProp={PersonOff}
                    pathProp="/Admin/bulkDelete"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Student Categories"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/studentCategories"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Disable Reason"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/disableReason"
                    linkProp=""
                />

            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*              FRONT OFFICE                */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Front Office"
                iconProp={Business}
                styleProp={7.2}
            >
                <ListItemButtonTemplate
                    textProp="Setup Front Office"
                    iconProp={DomainAdd}
                    pathProp="/Admin/frontOffice"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Visitor Book"
                    iconProp={FolderShared}
                    pathProp="/Admin/visitors"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Admission Enquiry"
                    iconProp={ContactPhone}
                    pathProp="/Admin/admissionEnquiries"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Phone Call Log"
                    iconProp={PhoneInTalk}
                    pathProp="/Admin/phoneCallLogs"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Postal Dispatch"
                    iconProp={MarkAsUnread}
                    pathProp="/Admin/postalDispatch"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Postal Receive"
                    iconProp={MailOutline}
                    pathProp="/Admin/postalReceive"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Complaints"
                    iconProp={ReportIcon}
                    pathProp="/Admin/complaints"
                    linkProp=""
                />
            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                EXAMINATIONS              */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Examinations"
                iconProp={Topic}
                styleProp={5.7}
            >
                <ListItemButtonTemplate
                    textProp="Exam Group"
                    iconProp={StickyNote2Outlined}
                    pathProp="/Admin/examGroups"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Exam Schedule"
                    iconProp={ViewTimeline}
                    pathProp="/Admin/examSchedule"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Exam Result"
                    iconProp={PresentToAll}
                    pathProp="/Admin/examResult"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Marksheets"
                    iconProp={ListAlt}
                    pathProp="/Admin/markSheets"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Admit Cards"
                    iconProp={StyleIcon}
                    pathProp="/Admin/admitCards"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Marks Grade"
                    iconProp={Grading}
                    pathProp="/Admin/marksGrade"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Marks Division"
                    iconProp={Notes}
                    pathProp="/Admin/marksDivision"
                    linkProp=""
                />

            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                INVENTORY                 */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Inventory"
                iconProp={Store}
                styleProp={9.5}
            >
                <ListItemButtonTemplate
                    textProp="Item Category"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/itemCategories"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Add Item"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/items"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Issue Item"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/issuedItems"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Item Store"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/itemStore"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Item Supplier"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/itemSuppliers"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Add Item Stock"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/itemStocks"
                    linkProp=""
                />

            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                HOSTEL                    */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Hostel"
                iconProp={HomeWork}
                styleProp={12}
            >
                <ListItemButtonTemplate
                    textProp="Hostel"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/hostels"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Room Type"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/roomTypes"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Hostel Rooms"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/hostelRooms"
                    linkProp=""
                />

            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                  LIBRARY                 */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Library"
                iconProp={CollectionsBookmark}
                styleProp={11.5}
            >
                <ListItemButtonTemplate
                    textProp="Book List"
                    iconProp={Notes}
                    pathProp="/Booklist"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Issue - Return "
                    iconProp={Notes}
                    pathProp="/issuereturn"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Add Student"
                    iconProp={Notes}
                    pathProp="/addstudent"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Add Staff Member"
                    iconProp={Notes}
                    pathProp="/addstaffmember"
                    linkProp=""
                />
            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                  INCOME                  */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Income"
                iconProp={Inventory}
                styleProp={11}
            >
                <ListItemButtonTemplate
                    textProp="Add Income"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Addincome"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Search Income"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/searchincome"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Icome Head"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/incomehead"
                    linkProp=""
                />


            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                HOMEWORK                  */}
            {/*__________________________________________*/}

            <ListDropdownComponent
                textProp="Homework"
                iconProp={Book}
                styleProp={8}
            >
                <ListItemButtonTemplate
                    textProp="Add Homework"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/homeworks"
                    linkProp=""
                />

                <ListItemButtonTemplate
                    textProp="Daily Assignment"
                    iconProp={KeyboardDoubleArrowRightIcon}
                    pathProp="/Admin/dailyAssignments"
                    linkProp=""
                />

            </ListDropdownComponent>
                {/*__________________________________________*/}
            {/*                 ATTENDANCE                 */}
            {/*__________________________________________*/}
           

            <ListDropdownComponent
                textProp="Attendance"
                iconProp={CollectionsBookmark}
                styleProp={8}
            >
                <ListItemButtonTemplate
                    textProp="Approve Leave"
                    iconProp={Notes}
                    pathProp="/approveleave"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Period Attendance "
                    iconProp={Notes}
                    pathProp="/periodattendance"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Period Attendance By Date"
                    iconProp={Notes}
                    pathProp="/attendancebydate"
                    linkProp=""
                />
                
            </ListDropdownComponent>


    {/*__________________________________________*/}
            {/*                FEE COLLECTION                */}
            {/*__________________________________________*/}
           

            <ListDropdownComponent
                textProp="Fee Collection"
                iconProp={CollectionsBookmark}
                styleProp={5}
            >
                <ListItemButtonTemplate
                    textProp="collect Fee"
                    iconProp={Notes}
                    pathProp="/collectfee"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Offline Bank Payment "
                    iconProp={Notes}
                    pathProp="/offlinepay"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Search Fees Payment"
                    iconProp={Notes}
                    pathProp="/searchfeepay"
                    linkProp=""
                />
                 <ListItemButtonTemplate
                    textProp="Search Due Fees"
                    iconProp={Notes}
                    pathProp="/duefees"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Fees Master "
                    iconProp={Notes}
                    pathProp="/feemaster"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Fees Group"
                    iconProp={Notes}
                    pathProp="/feegroup"
                    linkProp=""
                />
                 <ListItemButtonTemplate
                    textProp="Fees Type"
                    iconProp={Notes}
                    pathProp="/feetype"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Fees Discount "
                    iconProp={Notes}
                    pathProp="/feediscount"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Fees Carry Forward"
                    iconProp={Notes}
                    pathProp="/feecarryfor"
                    linkProp=""
                />
                  <ListItemButtonTemplate
                    textProp="Fees Reminder"
                    iconProp={Notes}
                    pathProp="/feereminder"
                    linkProp=""
                />
                
            </ListDropdownComponent>

              {/*__________________________________________*/}
            {/*                TRANSPORT              */}
            {/*__________________________________________*/}
           

            <ListDropdownComponent
                textProp="Transport"
                iconProp={CollectionsBookmark}
                styleProp={8}
            >
                <ListItemButtonTemplate
                    textProp="Fee Master"
                    iconProp={Notes}
                    pathProp="/transfeemaster"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Pickup Point "
                    iconProp={Notes}
                    pathProp="/pickuppoint"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Routes"
                    iconProp={Notes}
                    pathProp="/routes"
                    linkProp=""
                />
                  <ListItemButtonTemplate
                    textProp="Vehicles"
                    iconProp={Notes}
                    pathProp="/vehicles"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Assign Vehicle "
                    iconProp={Notes}
                    pathProp="/assignveh"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Route Pickup Point"
                    iconProp={Notes}
                    pathProp="/routepickpoint"
                    linkProp=""
                />
                <ListItemButtonTemplate
                    textProp="Student Transport Fees"
                    iconProp={Notes}
                    pathProp="/studenttransfee"
                    linkProp=""
                />
            </ListDropdownComponent>

            {/*__________________________________________*/}
            {/*                OTHERS                    */}
            {/*__________________________________________*/}

            <ListItemButtonTemplate
                textProp="Notices"
                iconProp={AnnouncementOutlinedIcon}
                pathProp="/Admin/notices"
                linkProp=""
            />

        </React.Fragment>
    )
}

export default AdminSideBar