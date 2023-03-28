import { Observable, from, map } from "rxjs";
import Axios from "../interceptors/axios.interceptor";

export interface Entity {
  id?: string;
}

export class DataService<T extends Entity> {
  constructor(public url: string) {}

  create(data: T): Observable<T> {
    const resource = from(Axios.post<T>(`${this.url}`, data));
    return resource.pipe(map((resp: { data: any }) => resp.data));
  }

  edit(data: T): Observable<T> {
    const resource = from(Axios.patch<T>(`${this.url}/${data.id}`, data));
    return resource.pipe(map((resp: { data: any }) => resp.data));
  }

  findOne(id: string): Observable<T> {
    const resource = from(Axios.get<T>(`${this.url}/${id}`));
    return resource.pipe(map((resp: { data: any }) => resp.data));
  }

  findAll(): Observable<T[]> {
    const resource = from(Axios.get<T>(`${this.url}`));
    return resource.pipe(map((resp: { data: any }) => resp.data));
  }

  remove(id: string): Observable<T> {
    const resource = from(Axios.delete<T>(`${this.url}/${id}`));
    return resource.pipe(map((resp: { data: any }) => resp.data));
  }
}
