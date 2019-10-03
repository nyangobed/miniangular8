import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';

import {Meta} from '@angular/platform-browser';
import { GlobalParams } from '../../../shared/services/globalparams';
import { DataTableWrapper } from '../../../entities/wrappers/data-table-wrapper';
import { ResponseWrapper } from '../../../entities/wrappers/response-wrapper';



const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class OnboardingserviceService<T, E>  {
  private headers: HttpHeaders;
  private  headersNoToken: HttpHeaders;
  private headersLogin: HttpHeaders;
  private headersPlain: HttpHeaders;
  private headersFormdata: HttpHeaders;
  token: string;

  constructor(private http: HttpClient, private globalParam: GlobalParams, private meta: Meta) {

        this.headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      });

      this.headersNoToken = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8'
          // 'X-CSRF-TOKEN': csrf
      });
      this.headersLogin = new HttpHeaders({
          'Content-type': 'application/x-www-form-baseUrlencoded; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Basic ' + btoa('common_module_client:secret')
      });
      this.headersPlain = new HttpHeaders({
          'Content-type': 'application/x-www-form-baseUrlencoded; charset=utf-8',
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      });

      this.headersFormdata = new HttpHeaders({
          // 'X-CSRF-TOKEN': csrf
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      });
   }


  
   private parseDataTableParams(dtParams: any, httpParams: HttpParams): HttpParams {
    httpParams = httpParams.append('Year', dtParams.Year);
    httpParams = httpParams.append('size', dtParams.length);
    httpParams = httpParams.append('page', '' + (dtParams.start / dtParams.length));
    // httpParams = httpParams.append('needle', dtParams.search.value);

    if (dtParams.search.value.length > 0) {
        httpParams = httpParams.append('needle', dtParams.search.value);
    }


    if (dtParams.order.length > 0) {
        httpParams = httpParams.append('sort', dtParams.columns[dtParams.order[0].column].data + ',' + dtParams.order[0].dir);
    }
    Object.keys(dtParams).forEach((key) => {
        if (key !== 'length' && key !== 'start' && key !== 'search' && key !== 'sort'
            && key !== 'order' && key !== 'columns') {
            httpParams = httpParams.append(key, dtParams[key]);
        }
    });
    return httpParams;
}

// obed's code
public intiateDataTable(endpoint: string, cols: Array<DataTables.ColumnSettings>,
    idField: string, params?: Map<any, string>, paramCallBack?: any): DataTables.Settings {
// let colz:Array<DataTables.ColumnSettings> = new ;
        if (params == null) {
        params = new Map<any, string>();
        }
        let dtOptions: any = {};
        let httpParams: HttpParams = new HttpParams();
        params.forEach((value: any, key: string) => {
        httpParams = httpParams.append(key, value);
        });
        dtOptions = {
        pagingType: 'full_numbers',
        serverSide: true,
        processing: true,
        responsive: true,
        searching: true,
        filter: true,
        ajax: (dTParams: any, callback) => {
        if (paramCallBack != null) {
        paramCallBack(dTParams);
        }
        // console.debug('TODO ======== implement sort for: \n DataTable Params: ' + JSON.stringify(dTParams));
        const options = {
        headers: this.headers,
        params: this.parseDataTableParams(dTParams, httpParams)
        };
        this.http
        .get<DataTableWrapper<T>>(
            this.globalParam.baseUrl + endpoint,
            options
        ).subscribe(resp => {
        callback({
            recordsTotal: resp.data.totalElements,
            recordsFiltered: resp.data.totalElements,
            data: resp.data.content
        });
        });
        },
        columns: cols,
        on: (event: string, callback: ((e: Event, settings: any, json: any) => void)) => {
        //('Testing on select event');
        },
        //            preDrawCallback: preCallBack,
        rowCallback: (row: Node, data: T[], index: number) => {
        //                $('td', row).unbind('click');
        //                $('td', row).bind('click', () => {
        //                    console.debug("Testing click event");
        //                });
        $(row).attr('data-id', data[idField]);
        return row;
        },
        dom: 'Bfrtip',
        stateSave: true,
        lengthMenu: [[10, 25, 50, 100, 250], [10, 25, 50, 100, 250]],
        buttons: [
        // 'columnsToggle',

        {
        text: 'Reload',
        action: function ( e, dt, node, config ) {
                            dt.ajax.reload();
        }
        },

        {
            extend: 'print',
            messageTop: 'Report Generated by Tracom Services Limited Email:sales@tracom.co.ke Tel: +254 (0)20 242 9692/3 Web: www.tracom.co.ke Location: Nairobi, Kenya',
            customize: function ( win ) {
                $(win.document.body)
                    .css( 'font-size', '15t' )
                    .prepend(
                        '<img src="https://tracom.co.ke/wp-content/uploads/2018/11/tracom-logo.png" style="position:relative; top:0; left:0; align:center;" />',
                        '<img src="https://tracom.co.ke/wp-content/uploads/2018/11/tracom-logo.png" style="position:absolute; top:0; right:0; align:center;" />'
                    );

                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );

            }
        },
        {
            extend:  'csv',
            exportOptions: {
                columns: [':visible' ]
            }
        },
        {
            extend:  'copy',
            exportOptions: {
             columns: [':visible' ]
            }
        },
        {
            extend:  'excel',
            exportOptions: {
                columns: [':visible' ]
            }
        },
        {
            extend:  'pdfFlash',
            exportOptions: {
                columns: [':visible' ]
            }
        },
        'pdf', 'pageLength'
        ],
        columnDefs: [{
        orderable: false,
        className: 'select-checkbox',
        targets: 0,
        checkboxes: {
        selectRow: true
        }
        }],
        select: {
        style: 'multi'
        // selector: 'td:first-child'
        },
        order: [[1, 'asc']]
        };
        return dtOptions;
}
postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            data[key].forEach(k2 => {
                formData.append(key, k2);
            });
        } else {
            formData.append(key, data[key]);
        }
    });
    return this.http.post(this.globalParam.baseUrl + endpoint, formData, {headers: this.headersFormdata}).pipe(
        catchError(this.handleError<any>())
    );
}
post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headers}).pipe(
        catchError(this.handleError<any>())
    );
}

 sendd(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.post(this.globalParam.baseUrl + endpoint, data).pipe(
        catchError(this.handleError<any>())
    );
}
put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint,  JSON.stringify(data), {headers: this.headers}).pipe(
  catchError(this.handleError<any>())
    );
}
update(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, data).pipe(
        catchError(this.handleError<any>())
    );
}
putNoToken(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.put(this.globalParam.baseUrl + endpoint, JSON.stringify(data), {headers: this.headersNoToken}).pipe(
        catchError(this.handleError<any>())
    );
}
delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
    return this.http.request('delete', this.globalParam.baseUrl + endpoint, {headers: this.headers, body: JSON.stringify(data)}).pipe(
        catchError(this.handleError<any>())
    );
}
get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
    const options = {
        headers: this.headers,
        params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
        catchError(this.handleError<any>())
    );
}
gett(endpoint: string, data?): Observable<ResponseWrapper<E>> {
    const options = {
        headers: this.headers,
        params: this.getHttpParams(data)
    };
    return this.http.get(this.globalParam.baseUrl + endpoint, options).pipe(
        catchError(this.handleError<any>())
    );
}
private getHttpParams(data: Map<string, string>): HttpParams {
    if (data === undefined) {
        return new HttpParams();
    }
    let httpParams: HttpParams = new HttpParams();
    data.forEach((value: string, key: string) => {
        httpParams = httpParams.append(key, value);
    });
    return httpParams;
}
// tslint:disable-next-line:no-shadowed-variable
private handleError<ResponseWrapper>() {
    return (error: HttpErrorResponse): Observable<any> => {
        const res = new ResponseWrapper();
        //            console.error(error); // log to console instead
        if (error.status === 500) {
            res.code = error.status;
            res.message = 'Duplicate Records, Please Check and Try Again';
        } else {
            res.code = error.status;
            res.message = error.error.message;
            res.data = error.error.data;
        }
        return of(res);
    };
}
// tslint:disable-next-line:member-ordering
static renderMore(id: any) {
    return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
}
}
