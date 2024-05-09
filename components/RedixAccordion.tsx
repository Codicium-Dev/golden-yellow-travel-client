"use client";

import * as Accordion from "@radix-ui/react-accordion";

import React, { useEffect } from "react";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { getRequest } from "@/services/api/apiService";
import { useQuery } from "@tanstack/react-query";

const RedixAccordion = (props: any) => {
  const id = props.id;

  console.log(id);

  const { data: Itinerary, refetch } = useQuery({
    queryKey: ["itinerary"],
    queryFn: () =>
      getRequest(
        `itinerary/list?page=1&per_page=100&columns=tour_id&search=${id}&order=created_at&sort=ASC`
      ),
  });

  useEffect(() => {
    refetch();
  }, [id]);

  console.log(Itinerary);

  return (
    <Accordion.Root
      className="AccordionRoot w-full h-full mt-3"
      type="single"
      collapsible
    >
      {Itinerary?.data?.data?.map((iti: any) => {
        return (
          <Accordion.Item className="AccordionItem px-3 py-2" value={iti?.id}>
            <AccordionTrigger>{iti?.name}</AccordionTrigger>
            <AccordionContent>
              <p className=" flex items-center gap-2 my-2">
                <div dangerouslySetInnerHTML={{ __html: iti?.description }} />
              </p>
              {iti?.itinerary_photo && (
                <img
                  src={iti?.itinerary_photo}
                  className=" w-[300px] h-[200px]"
                  alt=""
                />
              )}
            </AccordionContent>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
};

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Header className="AccordionHeader">
      <Accordion.Trigger
        className={classNames("AccordionTrigger", className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }: any, forwardedRef) => (
    <Accordion.Content
      className={classNames("AccordionContent", className)}
      {...props}
      ref={forwardedRef}
    >
      <div className="AccordionContentText">{children}</div>
    </Accordion.Content>
  )
);

export default RedixAccordion;
