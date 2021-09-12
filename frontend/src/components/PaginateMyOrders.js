import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginateMyOrders = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination class='pagination pagination'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ? `/profile/${x + 1}` : `/admin/orderlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default PaginateMyOrders;
