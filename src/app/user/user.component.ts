import { Component, OnInit } from '@angular/core';

import { NodeService } from '../nodeservice';
import { TreeNode } from 'primeng/api';
import { ApiService } from '../_services/api.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  months: month[];
  selectedMonth: month | undefined;

  circles: Drops[];
  selectedCircle: Drops | undefined;

  divisions: Drops[];
  selectedDivision: Drops | undefined;

  headofAccounts: Drops[];
  selectedHead: Drops | undefined;

  files1: TreeNode[] = [];
  flatFiles: any[] = [];

  dataArray: any[] = [];
  
  constructor(
    private nodeService: NodeService,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {
    this.months = [
      { name: 'January', code: 1 },
      { name: 'February', code: 2 },
      { name: 'March', code: 3 },
      { name: 'April', code: 4 },
      { name: 'May', code: 5 },
      { name: 'June', code: 6 },
      { name: 'July', code: 7 },
      { name: 'August', code: 8 },
      { name: 'September', code: 9 },
      { name: 'October', code: 10 },
      { name: 'November', code: 11 },
      { name: 'December', code: 12 },
    ];

    this.circles = [
      { name: 'Southern Circle - Kollam', code: 'c1' },
      { name: 'High Range Circle - Kottayam', code: 'c2' },
      { name: 'Central Circle - Thrissur', code: 'c3' },
      { name: 'Eastern Circle - Palakkad', code: 'c4' },
      { name: 'Northern Circle - Kannur', code: 'c5' },
    ];

    this.divisions = [
      // {name: 'Division 1', code: 'd1'},
      // {name: 'Division 2', code: 'd2'},
      // {name: 'Division 3', code: 'd3'},
      // {name: 'Division 4', code: 'd4'}
    ];

    this.headofAccounts = [
      { name: 'Forest Protection (Revenue)', code: 'a1' },
      { name: 'SOFB', code: 'a2' },
      // {name: 'Extension Forestry', code: 'a3'},
      { name: 'Eco Tourism', code: 'a4' },
      { name: 'NABARD', code: 'a5' },
      { name: 'Parambikulam Tiger Rreserve', code: 'a6' },
    ];
    this.nodeService.getFilesystem().then((files) => (this.files1 = files));
    this.nodeService
      .getFlatFilesystem()
      .then((files) => (this.flatFiles = files));
  }
  ngOnInit() {
    
  }

  setJson() {
    this.apiService.getPrevMonth(this.selectedMonth.code, 2021, this.selectedDivision ? this.selectedDivision.code : null, this.selectedCircle.code, this.selectedHead.code).subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
    this.apiService.getCurrentMonth(this.selectedMonth.code, 2021, this.selectedDivision ? this.selectedDivision.code : null, this.selectedCircle.code, this.selectedHead.code).subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
    this.dataArray = this.readKeys(this.flatFiles);
  }

  submitForm() {
    console.log(this.selectedMonth.code)
    console.log(this.selectedCircle.code)
    console.log(this.selectedDivision)
    console.log(this.dataArray);
    let currentUser = this.authService.userValue;
    this.apiService.submitForm(currentUser.id, this.selectedMonth.code, 2021, this.selectedCircle.code, null, this.selectedHead.code, this.dataArray)
    .subscribe(
      (res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      }
    );
  }
  readKeys(data: any) {
    let keyArr: any[] = [];
    let k = 0;
    for (let i in data) {
      let idname = data[i].data['id'];
      keyArr.push({
        id: idname,
        name: data[i].data['name'],
        unit: data[i].data['unit'],
      });
      keyArr[k][idname + 'pt'] = '';
      keyArr[k][idname + 'pa'] = '';
      keyArr[k][idname + 'ft'] = '';
      keyArr[k][idname + 'fa'] = '';
      k++;
    }
    console.log(keyArr)
    return keyArr;
  }
  exportExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Component Sheet');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Physical Target', key: 'pt', width: 20 },
      { header: 'Physical achievement', key: 'pa', width: 20 },
      { header: 'Financial Target', key: 'ft', width: 20 },
      { header: 'Financial Achievement', key: 'fa', width: 20 },
    ];

    this.dataArray.forEach((e) => {
      worksheet.addRow(
        {
          id: e.id,
          name: e.name,
          pt: e[e.id + 'pt'],
          pa: e[e.id + 'pa'],
          ft: e[e.id + 'ft'],
          fa: e[e.id + 'fa'],
        },
        'n'
      );
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'Division Data Sheet.xlsx');
    });
  }

  setData(id: any, item: any, event: any) {
    this.dataArray.forEach((element) => {
      if (element['id'] == id) {
        element[id + '' + item] = event.target.value;
      }
    });
    console.log(this.dataArray)
  }
}

interface month {
  name: string,
  code: number
}

interface Drops {
  name: string;
  code: string;
}
