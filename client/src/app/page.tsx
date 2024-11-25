"use client";

import React, { useCallback, useReducer } from "react";

import dynamic from "next/dynamic";
import useSWR, { mutate } from "swr";

import {
  ERROR_MESSAGES,
  FORM_MASKS,
  FORM_VALIDATIONS,
  INITIAL_STATE_FORM,
  INITIAL_STATE_REDUCER
} from "./constants";
import { reducer } from "./reducer";
import styles from "./styles.module.css";
import { createQueryString, QueryStringParams } from "./utils";
import { applyFilters, clearFilters, setLoading, setSearch } from "./actions";

import useAuth from "@/hooks/useAuth";
import useForm from "@/hooks/useForm";
import useAlert from "@/hooks/useAlert";
import { fetcher } from "@/utils/swrFetcher";
import { LogoutFunction } from "@/interfaces/INavBar";
import { MetricsResponse } from "@/interfaces/IMetrics";
import { ChangeFunction } from "@/interfaces/IFormHook";
import { AddTaskFunction, Task, TaskResponse } from "@/interfaces/ITask";
import { SEVERITY_ALERT } from "@/constants/severityAlert";
import { labelsEndpoints, tasksEndpoints } from "@/utils/endpoints";
import { AddLabelFunction, LabelResponse } from "@/interfaces/ILabel";

const List = dynamic(() => import("@/components/List/List"));
const NavBar = dynamic(() => import("@/components/NavBar/NavBar"));
const Filter = dynamic(() => import("@/components/Filter/Filter"));
const NewTask = dynamic(() => import("@/components/NewTask/NewTask"));
const Metrics = dynamic(() => import("@/components/Metrics/Metrics"));

export default function Home() {
  const { showAlert } = useAlert();
  const { user, updateUser, logout } = useAuth();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE_REDUCER);

  const newTaskForm = useForm({
    applyMask: FORM_MASKS,
    validateForm: FORM_VALIDATIONS,
    initialForm: INITIAL_STATE_FORM
  });

  const { data: tasksData, isLoading: tasksLoading } = useSWR<TaskResponse>(
    tasksEndpoints.get + createQueryString(state as QueryStringParams),
    fetcher,
    {
      onError: () =>
        showAlert("Ha ocurrido un error de servidor.", SEVERITY_ALERT.error)
    }
  );

  const { data: metricsData, isLoading: metricsLoading } =
    useSWR<MetricsResponse>(tasksEndpoints.metrics, fetcher, {
      onError: () =>
        showAlert("Ha ocurrido un error de servidor.", SEVERITY_ALERT.error)
    });

  /**
   * Handles the logout process by calling the `logout` function and displaying an alert message.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves once the logout process is complete and the alert is shown.
   */
  const handleLogout: LogoutFunction = useCallback(async () => {
    await logout();
    showAlert("¡Adiós, vuelve pronto!", SEVERITY_ALERT.info);
  }, [logout, showAlert]);

  /**
   * Dispatches an action to update the loading state in the global state.
   *
   * This function triggers the `setLoading` action to update the `isLoading`
   * state to reflect whether the app is currently loading or not.
   *
   * @param {boolean} payload - The value to set for the `isLoading` state.
   *                             `true` indicates loading, `false` indicates not loading.
   * @returns {void} - This function does not return a value.
   */
  const setIsLoading = (payload: boolean): void =>
    dispatch(setLoading(payload));

  /**
   * Handles the process of adding a new label for the user.
   *
   * @param {string} label - The label to be added to the user's label list.
   *
   * @returns {Promise<void>} - This function returns a promise, but does not resolve to a value. It performs side effects.
   */
  const handleAddLabel: AddLabelFunction = useCallback(
    async (label) => {
      setIsLoading(true);

      try {
        const response = await (
          await import("@/services/fetchServices")
        ).fetchServices.post<LabelResponse>({
          body: { label },
          endpoint: labelsEndpoints.create
        });

        if (response.success) {
          await updateUser({
            ...user,
            labels: response.data.labels
          });
          setIsLoading(false);
          return true;
        }
      } catch (error) {
        const typedError = error as { details: string };

        const message =
          ERROR_MESSAGES[typedError.details] || ERROR_MESSAGES.default;

        showAlert(message, SEVERITY_ALERT.error);
      }
      setIsLoading(false);
      return false;
    },
    [user, showAlert, updateUser]
  );

  /**
   * Handles the process of creatting a new task for the user.
   *
   * @param {Task} task - The task object containing the data for the new task to be added.
   * @returns {Promise<void>} A promise that resolves when the task is added successfully and the necessary data is updated.
   *
   * @throws {Error} Will show an alert if there is an error while adding the task.
   */
  const handleAddTask: AddTaskFunction = useCallback(
    async (task) => {
      setIsLoading(true);
      try {
        const response = await (
          await import("@/services/fetchServices")
        ).fetchServices.post<TaskResponse>({
          body: { ...task },
          endpoint: tasksEndpoints.create
        });

        if (response.success) {
          showAlert("Se ha añadido una nueva tarea", SEVERITY_ALERT.success);

          await Promise.all([
            mutate(tasksEndpoints.get),
            mutate(tasksEndpoints.metrics)
          ]);

          setIsLoading(false);
          return true;
        }
      } catch (error) {
        showAlert(
          "Ha ocurrido un error al intentar agregar la tarea",
          SEVERITY_ALERT.error
        );
      }
      setIsLoading(false);
      return false;
    },
    [showAlert]
  );

  // const handleSearch: ChangeFunction = useCallback((event) => {
  //   const { value } = event.target;
  //   dispatch(setSearch(value));
  // }, []);

  // const handleResetFilters = useCallback(() => dispatch(clearFilters()), []);

  const handleApplyFilters = useCallback((payload) => {
    const filters = {};

    Object.entries(payload).forEach(([field, value]) => {
      if (value) filters[field] = value;
    });

    dispatch(applyFilters(filters));
  }, []);

  const handleDeleteTask = useCallback(
    async (taskId) => {
      setIsLoading(true);
      try {
        const response = await (
          await import("@/services/fetchServices")
        ).fetchServices.post({
          body: { id: taskId },
          endpoint: tasksEndpoints.remove
        });

        if (response.success) {
          await Promise.all([
            mutate(tasksEndpoints.metrics),
            mutate(tasksEndpoints.get)
          ]);
        }
      } catch (error) {
        showAlert(
          "Ha ocurrido un error al intentar eliminar la tarea",
          SEVERITY_ALERT.error
        );
      }
      setIsLoading(false);
    },
    [showAlert]
  );

  // console.log(tasksData?.data);
  return (
    <section>
      <NavBar user={user} handleLogout={handleLogout} />
      <div className={styles["main-container"]}>
        <NewTask
          newTaskForm={newTaskForm}
          labelOptions={user.labels}
          isLoading={state.isLoading}
          handleAddTask={handleAddTask}
          handleAddLabel={handleAddLabel}
        />
        <div className={styles["tasks-container"]}>
          <Metrics {...(metricsData?.data || {})} isLoading={metricsLoading} />
          <Filter
            search={state.value}
            labelOptions={user.labels}
            // handleSearch={handleSearch}
            // handleApplyFilters={handleApplyFilters}
            // handleResetFilters={handleResetFilters}
          />
          <List
            page={state.page}
            isLoading={tasksLoading}
            setPage={handleApplyFilters}
            tasks={tasksData?.data || []}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
    </section>
  );
}
