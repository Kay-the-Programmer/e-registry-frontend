import { Routes } from '@angular/router';
import {FilesComponent} from "./files/files.component";
import {MemosComponent} from "./memos/memos.component";
import {AnalyticsComponent} from "./analytics/analytics.component";
import {UserAccountComponent} from "./user/user-account/user-account.component";
import {ComponseMemoComponent} from "./user/componse-memo/componse-memo.component";
import {FileOverviewComponent} from "./files/file-overview/file-overview.component";
import {RecentFilesComponent} from "./files/recent-files/recent-files.component";
import {OtherDepartmentsComponent} from "./files/other-departments/other-departments.component";
import {DepartmentFilesComponent} from "./files/department-files/department-files.component";
import {HomeComponent, MemoTrailComponent} from "./user/home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {UserComponent} from "./user/user.component";
import {DashboardContainerComponent} from "./user/dashboard-container/dashboard-container.component";
import {RegistryComponent} from "./registry/registry.component";
import {RegistryBoardComponent} from "./registry/registry-board/registry-board.component";
import {RegistryDashboardComponent} from "./registry/registry-dashboard/registry-dashboard.component";
import {ManageFilesComponent} from "./registry/manage-files/manage-files.component";
import {ManageUsersComponent} from "./registry/manage-users/manage-users.component";
import {TrackMemoComponent} from "./registry/track-memo/track-memo.component";
import {UserProfileComponent} from "./registry/user-profile/user-profile.component";
import {FileDetailsComponent} from "./registry/manage-files/file-details/file-details.component";
import {MemoDetailsComponent} from "./registry/manage-files/memo-details/memo-details.component";
import {NewMemoComponent} from "./user/new-memo/new-memo.component";
import {UserFilesComponent} from "./user/user-files/user-files.component";

export const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardContainerComponent,
        children: [
          {
            path: "home",
            component: HomeComponent,
          },
          {
            path: "compose",
            component: NewMemoComponent,
            title: "Compose Memo"
          },
          {path: 'files', component: UserFilesComponent,
            children: [
              {
                path: "",
                component: FileOverviewComponent,
                title: "Overview"
              },
              {
                path: "r-files",
                component: RecentFilesComponent,
                title: "Recent Files",
              },
              {
                path: "o-dept",
                component: OtherDepartmentsComponent,
                title: "Other departments",
              },
              {
                path: "y-dept",
                component: DepartmentFilesComponent,
                title: "Department Files",
              }
            ]
          },
          {path: 'files/:id', component: FilesComponent},
          {path: 'memos', component: MemosComponent},
          {path: 'memos/:id', component: MemosComponent},
          {path: 'analytics', component: AnalyticsComponent},
          {path: 'user-profile', component: UserProfileComponent},
          {path: "memo-trail", component: TrackMemoComponent}
        ]
      }
    ]
  },
  {
    path: "registry",
    component: RegistryComponent,
    children: [
      {
        path: "dashboard",
        component: RegistryBoardComponent,
        children: [
          {
            path: "registry-dashboard",
            component: RegistryDashboardComponent
          },
          {
            path: "manage-files",
            component: ManageFilesComponent,
          },
          {
            path: 'file-details/:id',
            component: FileDetailsComponent
          },
          {
            path: 'memo-details/:id',
            component: MemoDetailsComponent
          },
          {
            path: "manage-users",
            component: ManageUsersComponent,
          },
          {
            path: "user-profile",
            component: UserProfileComponent,
          },
          {
            path: "track-memo",
            component: TrackMemoComponent,
          }
        ]
      },
    ]

  },
  {path: '', redirectTo: '/auth', pathMatch: 'full'}
];
