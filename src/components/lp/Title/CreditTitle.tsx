import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "../hooks";
import { media } from "../variables";

const linePath = `M13.2,128.3c-4.8-1.2-7.8-3.7-10.7-8.3c-2-3.1-2.8-9.3-2.4-13.8c0.2-3.3,1-6.4,2.8-10.7
c2.1-4.3,4.3-10,7.9-12.6c2.3-1.6,4.3-3.7,5.5-5.2c3-3.3,5.7-3.8,12.6-3.4c0,0,0.8,0.2,1.8,1.5c1.9,2.3,3,5.8,2.6,7.4l0.5,5.2
c0.1,1.1-1.7,2.6-3,3c-1.4,0.1-3.7-1.6-3.8-2.4l-0.1-1.4c0.9-2,1-3.9,0.3-5.8c-0.4-1.1-1.8-1.8-3.2-2.2c-2.8-0.3-5.1,0.8-6.9,2.6
c-5.7,6.9-8.8,14.6-10.2,25.2c-0.1,1.7,0,3.3,1.2,7c0.1,0.8,0.4,1.6,0.5,2.2c0.6,3.5,3.1,6,6.5,7.1c5.6,1.4,14,5,25.6-4.9
c0.2-0.3,0.5-0.3,2.4-1.1c3.2-1.1,8.5-3.3,10.9-6.8c0.5-0.6,0.5-0.9,1.7-2.1c1-0.9,2.5-2.4,3-3.6c2.2-2.4,3.4-4.2,5.8-8
c0.5-0.9,1.2-2,1.7-2.6c0.5-0.9,1.5-1.5,2.3-1.9c0.5-0.1,0.8-0.1,2.1,1.5c0.3,0.2,0.1,3.6-0.7,4.5L62.2,109
c-6,8.8-13.2,14.2-26.6,18c-0.5,0.3-0.8,0.4-1.6,1c-0.5,0.1-1.3,0.7-1.6,0.7C28,130.4,18,129.7,13.2,128.3z M101.5,117.6
c-2.8,0-5.1-1.4-6.4-4.1c-2-3.4-4.2-6.7-3.2-10.7l2.6-10.4c0.2-0.6,0.2-0.8,0.9-1.7c1.7-2.1,2.2-3,1-4.2c-0.7-1.3-2.9-1.9-4.6-2.3
C90.6,84,90.6,84,90,83.8c-0.5,0.1-1.4-0.7-2.6-1.4c-3.3-2.4-5.5-3-7.6-2c-2.3,1.6-3.7,4.2-4,6.7l-5.6,10.4
c-0.2,0.6-0.5,0.6-0.7,1.2c-0.9,1.7-1.9,3.5-3.1,4.7l-1.1,0.1c-0.8,0.1-2.7-1.9-2.4-2.2c0.7-1.2,0.9-2,1.8-3.8c0.6-2,1.3-4,2.5-5.2
c1.9-2.9,2.8-4.9,4.8-10.1c0.7-1.7,1.3-3.7,2-5.1c1.2-2.3,0.9-4.8-0.6-8.7c-0.7-1.6-0.9-3.5,0.3-5.3l2.4-4.1
c0.2-0.6,0.7-1.4,0.7-1.7c2.2-2.7,4.3-3.7,8-2.7c1.7,0.4,3,3,2.1,4.5c-1.7,2.6-3,5.5-4.1,9.2c-1.2,2-0.8,3.4,0.8,5.7
c2.2,3.4,7.8,6.4,13.6,7.2c1.4,0.1,3.1,0.8,4.8,1.2c0.8,0.2,1.1,0.4,1.7,0.4c0.6,0.2,1.3,2.3,1.1,3.2c-0.7,0.9-1.2,1.8-2.1,3.5
c-0.4,1.1-1.4,2.6-1.9,3.5c-2.8,4.7-3.2,9.4-1.6,14.5c1.4,5.6,3.7,7.3,9.5,7.1c1.6-0.2,1.9-0.2,2.5,0c3.5-0.6,7-1.2,11.2-3.8
c0.7-1.4,1.5-2.1,2-2.1c2.1-1,3.4-2,4.6-3.5c1-0.9,1.5-1.8,2.5-2.2c2.5-2.2,4.5-4.3,5.1-6.8c0.5-0.9,0.7-1.2,1.7-2.4
c0.7-0.9,1.5-1.8,1.5-2.1c1.6-3.7,2.8-5.5,3.6-5.6c0.5-0.1,1.4,0.7,2.4,2c0.1,0.5-0.7,4.2-1.2,4.2l-0.9,1.7c-0.4,1.1-0.9,2-1.6,2.9
c-0.2,0.6-0.5,0.9-1.2,1.5c-1.5,1.2-1.8,1.8-2.4,3.5c-0.4,1.4-2.8,4.7-3.6,5c-1.3,1-1.8,1.5-3.6,2.5c-1.6,1-3.6,2.3-5.1,4.3
c-3.8,3.1-5.8,3-10.4,3.7C110.8,119.7,106.5,120.4,101.5,117.6z M143,108.4c-2.6-4.7-3.5-7.6-3.2-10.7c0.1-1.9,0.2-3.3,0.2-6.1
c-0.1-3.6-0.1-6.9,1.2-10.3c0.2-1.1,0.4-1.7,1-3.7c0.2-1.1,0.6-2.5,1-3.7c1.2-4.2,3.1-7.4,5.4-9.9c3.7-3.9,6.9-5.6,11-5.7
c1.6-0.2,3,0.3,4.8,1.7c3.3,2.7,4.1,5.1,2.4,8.3c-0.8,2.8-1.2,4.8-1,6.4c-0.2,6.6-3.9,10.6-8.2,14.8c-1,0.6-1.5,1.2-3.9,2.3
c-6.3,3.4-8,2.1-5.4,12.6c1.4,2.9,3.8,4.9,8,6.4c8.5,2.8,12.8,1.5,18.5-1.8l2.6-1.4c1.6-0.7,2.9-1.6,4.5-2.1c0.8-0.4,1.8-1,2.6-1.6
c2-1.8,3.3-3.1,6.1-5.3c3.3-2.5,6.7-5,9.8-9.7l3.6-5.6c0.7-1.4,2.4-3.3,3.2-4.2c0.8-0.6,1.3-0.7,2.5,0.3c0.5-0.1,0.9,1.3,0.5,2.7
c-0.2,0.3-0.5,0.9-0.7,1.7c-0.4,1.4-0.6,2.3-0.9,2.3c-1.7,2.6-2.4,3.8-4.4,6.2c-0.7,1.2-1.9,2.7-3.2,4.2c-2.7,3.8-5.7,6.9-9.3,8.9
c-2.1,1.3-4.4,2.4-5.7,4.1c-7.2,5.4-11.5,6.1-19.1,7.6l-1.4,0.1C157.2,118.8,147.5,114.8,143,108.4z M151.5,87.7
c3.1-1.7,5.4-4.4,5.9-6.9c0.4-1.7,0.9-2.6,1.5-4c1.9-2.9,2.3-4.3,2.1-6.3l-0.1-1.4c-0.3-3-1.6-4.8-3.7-4.6c-1.4-0.1-2.7,0.5-3.7,2
c-0.8,0.6-0.7,0.9-0.7,0.9c-1.5,1.5-2.2,2.7-3.3,5.5c-0.4,1.1-0.2,0.8-0.4,1.1c-1.2,2-1.6,3.7-1.7,7.6c-0.1,1.4-0.3,3-0.7,4.5
c0.1,0.5,0.1,1.4,0.5,1.9C147.2,89.5,150.7,88.6,151.5,87.7z M244.4,104.6c-0.4-0.8-1.2-1.3-2.1-2.3c-1.8-1.5-5.4-1.4-6.3-0.2
c-1.6,1-3.9,2.3-4.9,3.8c-2.8,2.7-5.1,3.8-11.3,5.5c-1.1,0.4-2.2,0.5-2.9,0.8c-2.4,0.5-5-0.1-7.9-2.5c-0.6-0.5-1.2-1.5-1.9-2.6
c-0.9-0.7-0.9-1-1.5-1.8c-1.2-1.3-1.7-3.4-1-4.6c1.1-2.6,1.3-4,0-5.2c-0.4-1.1-0.5-2.4,0.2-3.3c1.2-1.5,1.4-2.6,2-5.4
c0.2-0.8,0.1-1.7,0.3-2.2c-1.9-2.8,0.1-5,1.7-7.6c1.5-2.1,2.4-3.8,4.2-7.6c0.2-0.8,0.7-1.7,0.9-2c2.6-4.9,6.1-8,10.6-10.1
c5-2.1,10.2-2.6,15.3,1.8c2.2-2.7,2.7-3.8,3.6-8c0.2-1.1,0.3-2.2,0.8-3.1c0.2-0.8,0.1-1.4,0.5-3.1c0.1-2.2,0.4-4.4,1.9-6
c0.5-0.6,0.7-1.4,0.6-2.3c-0.7-4.6,0.8-8.6,2.3-12.9c0.4-1.7,1.3-3.7,1.7-5.4C252.8,12,257,7.7,264.4,4c0.2-0.3,0.5-0.3,1.1-0.1
c8.6,3.3,8,3.1,7.1,10.6c-0.4,2-0.4,3.9-0.3,5.8c0.3,2.7-0.6,5-1.5,7.6c-1.2,4.2-2.5,8.5-4.9,14.5c-0.9,1.7-1.4,2.9-2.2,5.7
c-1.1,2.9-1.9,5.7-3.4,8c-0.7,1.2-0.9,2.3-0.8,3.4c0.1,0.8-0.1,1.4-1.1,2.6c-1,1.5-1.7,2.1-1.1,3.1c-2.5,2.7-4.1,5.6-6.1,11
c-0.6,2.5-1.5,4.3-2.3,5.2c-3.7,4.2-4.2,7.8-2.1,15.6c2.2,8.3,5.4,10.2,13.4,8.1c3.2-0.9,7.1-2.9,9.4-4.8l2.8-2.2
c3.4-2.2,7.8-5.1,9.9-8.7c0.4-1.1,1-1.5,2.4-3.3c2.2-3,5.4-6.8,7.6-12.6c1.2-2.3,2.2-2.7,4.2-2.3c0.3,0,0.9,1.3,1,1.6
c-0.2,0.6-0.5,0.6-0.4,1.1c-0.4,1.4-0.9,2.3-0.9,2c-3.6,8-11.2,17.6-16.9,23.9c-0.7,0.9-1.3,1.2-3.1,2.2c-4.4,2.6-8.6,5-12,6.7
c-3.9,2.3-5.6,1.9-10.6,1.3C249.8,109.9,246.1,108.9,244.4,104.6z M235.5,92.8c0.9-1.7,1.6-3.2,3.5-6.4c0.1-1.7-0.5-2.7-2-3.4
c-1.8-1.2-2.5-3.3-2.1-7.5c-0.1-0.5-0.1-1.1,0.1-1.9l0.2-0.6l1.1-5.3c0.5-3.1-0.5-4.9-3.7-6.5c-2.1-1.5-4.7-0.4-6.4,1.7
c-1.8,1.5-3.3,3.1-6.3,6.1c-0.5,0.6-1.5,1.5-2.3,2.1c-0.5,0.6-1,1.2-1.4,2.6c-1.8,4.6-3.8,9.2-5.3,13.7c-0.4,1.4-0.3,2.5-0.4,4.7
c-0.1,1.7,0,3.3-0.6,5c-0.5,3.1,0.8,6,4.4,8.6c1.8,1.5,4,1.5,5.9,0.8C226.6,103,232.3,99.2,235.5,92.8z M253.8,57.5
c0.2-0.6,0.2-1.1,0.3-2.2c0.3-2.2,0.6-2.8,0.8-3.1c1.5-2.1,2.1-3.5,3.4-7.2c0.4-1.1,0.9-2.6,1.3-3.4c1.8-3.8,3.7-7.8,5.1-12.9
c0.6-2,1-3.7,1.5-7c-0.1-0.8,0.1-1.9,0.3-2.8c-0.1-0.5,0.2-1.1,0.1-1.7c0.2-1.1,0.4-2,0.3-2.8c-0.1-0.8-0.7-1.9-1.4-2.6
c-0.7-1.6-4.7,0.2-5,2.1c-0.9,2-1.6,3.5-2.6,6.9c-0.7,1.4-1.3,3.4-2,4.9c-0.2,1.1-0.4,1.7-1,3.9c-0.4,1.4-0.8,2.8-1,3.9
c-3.7,7.8-4.5,15.8-5.4,23.9c-0.7,1.7-0.4,4.4,2.1,4.5C251.3,62.2,253.9,58.6,253.8,57.5z M304.4,102.7c-2.2-0.3-2.8-0.6-3.4-1.3
c-2.4-2-4.9-4.8-7.1-8.1L293,84c-1.4-8.7,0.3-17.1,2.2-25.5c0.1-1.7,0.8-3.1,1.5-4c1-1.5,2.9-1.4,4.1,0.2c0.3,0,0.6,0.8,0.7,1.6
l-2.4,18.1c-0.7,4.5-0.5,9.4,0.7,15.6c0.7,4.1,3.1,6.6,7.1,7.8c0.5-0.1,0.5-0.1,2,0.4c0.6,0.5,0.9,0.5,1.4,0.7
c1.1,0.2,2.8,0.3,4.4-0.1c3.8-0.9,6.6-2.8,10.6-6.5c3.6-3.1,6.8-6.2,9.2-10c0.9-1.7,1.6-2.9,2.9-4.4c1.5-2.1,3.1-4.4,5-8.5
c0.6-2,1.1-2.6,3.5-3.6c0.5-0.3,1.4,0.1,1.7,0.9c0.1,1.4,0.2,1.6-0.3,2.5c-0.4,1.1-0.7,1.7-0.8,2.8c-1,1.5-2.1,4.1-2.5,5.2
c-0.5,0.6-0.7,1.2-1.7,2.6c-1.7,2.6-4.1,6.2-7.3,9.8c-2.9,3.9-6.2,7.2-9.3,9.1c-7.3,4.3-12.9,5.9-18.8,4.3
C306,102.8,305.2,102.9,304.4,102.7z M302.1,13.8c-0.5-1.9,0-3,1-4.2c0.8-0.4,1-0.6,2.3-1.6l1.3-0.9c1.6-1,3.3,0,3.7,1.6
c0.9,3.8-1.7,7.6-4.8,7.6C304,16.1,302.5,15.2,302.1,13.8z M354.3,95.7c-1.4-0.7-2.3-0.9-3.1-1.1c-0.3,0-0.6-0.2-1.2-1
c-0.3-0.5-0.9-1-2-1.2c-1.4-0.4-4.2-6.5-4.4-11.4c-0.7-7.4-0.8-13.7,1.1-20.4c0.2-0.8,0.1-1.4,0.8-3.1l1-3.7c-0.2-1.6,0-2.5,0-3
c1.4-2.6,2.1-4.3,2.5-8.2c0.4-1.7,0.5-3.3,1.2-5.1c0.3-2.2-1.4-2.9-4.3-2.3c-0.5,0.1-0.8,0.1-1.1-0.2c-1.1-0.2-2.5,0-5.1,0.8
l-2.2,0.2c-2.2,0.5-3.2,0.6-4.4,0.4c-0.5,0.1-1.2-0.7-1.3-1.8c-0.4-0.8-0.6-0.5,0.2-0.8l0.5-0.3c2.6-1.6,5-2.1,7.5-2.1
c3.3,0,4.4-0.4,5.4-0.8c0.5-0.3,1.6-0.7,3.8-0.9s3.7-2,4.2-4.5c1-1.5,1.6-3.7,1.2-4.8c-0.4-1.3-0.2-2.2,0.5-3.6
c1.2-1.8,1.4-2.6,1-3.9l3.2-9.4c0.6-2.3,1.7-2.6,3.4-1.4l1.2,1c0.6,0.5,0.9,1,1,1.8l0.2,2.5c0.1,1.4,0.2,2.2,0,2.8
c-0.6,2.3-1,3.9-1.3,6.5c-0.1,1.7-0.5,3.6-1.3,6.4l-0.5,0.9c-1.2,2-1.3,3.2,0.4,3.8c2.5,0.3,4.7-0.2,6.5-0.9
c7.4-2.9,12.6-2.9,20-3.3c0.3,0,0.8-0.1,1.1,0.2l0.6,0.8c0.6,0.2,0.3,0.2,0.3,0.2c0.1,0.5-0.4,1.7-0.6,2c-0.8,0.4-1.6,0.7-2.4,0.8
c-1.6,0.2-3,0.6-4.1,0.7c-2.2,0.5-3.8,0.9-6.5,1.2c-0.8,0.1-1.4,0.1-1.9,0.5l-0.5,0.1c-2.2,0.2-4.1,0.7-5.7,0.8
c-1.6,0.4-3.2,0.6-5.4,0.8c-3.8,0.6-4.8,1.6-5.1,4.6c-0.6,2.5-1,3.7-1.7,4.8c-1.6,2.9-2,4.6-1.7,7.6c0,0.3-0.2,1.1-0.9,2.3
c-0.5,0.9-0.7,1.7-0.9,2c-5.6,15.7-5.3,21.7-3.2,31.9c0.2,1.6,0.8,2.1,2.9,4.1c5.7,4.7,11.8,5.5,19.2,2c5.3-2.4,10-4.5,14-9
c1.2-1.8,1.7-2.1,3-2.8c0.8-0.4,2.1-0.8,3.4-2c2.3-1.9,4.3-3.7,6-6.1c0.7-0.9,1.2-1.8,2.7-3.8c1.2-2.3,2.8-4.7,4.1-5.9
c0.5-0.3,0.8-0.6,1.6-0.2l0.9,0.7c1.2,1,1,1.6,0.9,1.3c-0.2,0.8-0.5,0.9-0.7,1.7c-0.4,1.4-0.8,2.8-1.6,3.7
c-1.5,1.2-2.2,2.4-4.4,5.4c-1.2,1.8-2.7,3.8-3.6,5c-3.7,3.9-5.8,5.5-9.2,7.8c-1.3,0.7-2.8,1.9-4.4,2.9c-4.1,3.1-6.7,4.2-11.5,6.3
C363.5,99.5,358,97.3,354.3,95.7z M420.8,89.6c-0.8-0.2-1.2-1-1.3-2.1c-0.5-4.9,2.7-9.3,7.1-9.2c0.5-0.6,2,0.4,2.3,1.4
c0.9,3.2,0.1,6.6-1.9,9c-1,0.7-1.6,1-4.8,1.3L420.8,89.6z`;

const labelPath = `M76.6,19.7c0.1-0.1,0.2-0.1,0.3-0.1c0.5,0,1.9,2.2,2.1,2.6c0.7-0.2,1.5-0.3,2.4-0.3c0.7,0,1.5,0.1,2.2,0.3
c0.5-0.8,1-1.6,1.4-2.4c0.1-0.2,0.2-0.3,0.4-0.3c0,0,0.1,0,0.1,0c2.8,1.4,3.2,1.6,3.2,1.9c0,0.1-0.3,0.7-1.6,2.5
c1.8,1.7,1.9,4.2,1.9,4.8c0,2.1-0.9,4.1-2.7,6c-0.2,0.2-0.3,0.3-0.5,0.3c-0.3,0-2.6-1.2-2.7-1.2c-0.2-0.1-0.3-0.2-0.3-0.3
s0.1-0.2,0.2-0.3c1.3-1.2,2.2-3.1,2.2-4.6c0-0.5-0.1-1-0.3-1.5c0-0.1-0.1-0.1-0.1-0.1c-3.7,4.6-6.4,6.7-7.4,6.7
c-0.3,0-0.5-0.1-0.6-0.4c-1.4-2.2-1.9-4.1-1.9-5.7c0-1.4,0.5-2.6,1.3-3.5c-1.8-2.2-1.9-2.3-1.9-2.4c0-0.1,0.1-0.2,0.2-0.3
L76.6,19.7z M78.9,27c-0.1,0.1-0.2,0.1-0.2,0.1c-0.1,0-0.3-0.1-0.6-0.5c-0.1,0.3-0.2,0.6-0.2,0.9c0,0.6,0.4,1.5,0.6,1.5
c0.1,0,1.2-1.2,3.3-4.1c-0.1,0-0.2,0-0.4,0c-0.3,0-0.7,0-1,0.1c0.1,0.2,0.2,0.4,0.2,0.6c0,0.1,0.1,0.2,0.1,0.3s0,0.2-0.2,0.3
L78.9,27z M99.3,29.9c-0.2-0.1-0.3-0.2-0.3-0.4c0-0.1,0-0.1,0-0.1c0.6-1.6,1.2-3.3,1.7-5l-1.6-0.2c-0.2,0-0.3-0.2-0.3-0.3v0L99,21
c0-0.2,0.2-0.3,0.3-0.3h0l2.3,0.2c0.1-0.6,0.3-1.1,0.4-1.5c0.1-0.2,0.1-0.3,0.4-0.3h0.1l3.2,0.3c0.3,0,0.3,0.3,0.3,0.5
c0,0.1-0.2,1.1-0.3,1.5l0.9,0.1c0.2,0,0.3,0.2,0.3,0.3v0l-0.3,2.9c0,0.2-0.2,0.3-0.3,0.3h0l-1.5-0.1c-0.5,1.9-1.2,3.7-2.1,5.3
c-0.1,0.2-0.2,0.3-0.5,0.3c0,0-0.1,0-0.1,0L99.3,29.9z M111.8,34.2c0,0.4-0.3,0.4-1.2,0.4c-3.2,0-6.1-1.3-6.1-1.8
c0-0.1,0-0.1,0-0.2l1-2.5c0.1-0.2,0.1-0.3,0.3-0.3c0.1,0,0.2,0,0.3,0.1c1.3,0.4,3.3,0.8,5.3,0.9c0.2,0,0.4,0.1,0.4,0.5L111.8,34.2z
 M108.2,25.8c-0.1-0.1-0.2-0.1-0.2-0.3c0-0.1,0-0.1,0.1-0.2l1.1-2.4c0.1-0.2,0.1-0.2,0.3-0.2c0.5,0,3.3,1,3.9,1.3
c0.1,0.1,0.3,0.1,0.3,0.3c0,0.1,0,0.2-0.1,0.3l-1.2,2.8c-0.1,0.2-0.2,0.3-0.3,0.3c-0.1,0-0.1,0-0.2-0.1L108.2,25.8z M125.7,34.4
c-0.2,0-0.4-0.1-0.4-0.6v-3.7c-0.2,0.3-0.3,0.7-0.5,1c-0.1,0.1-0.2,0.2-0.3,0.2c-0.1,0-0.2,0-0.4-0.1c-0.5-0.3-1.5-0.7-2-1
c-0.2-0.1-0.3-0.3-0.3-0.4c0-0.3,1.8-3.3,2-3.7l-2-0.9c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2l1.4-2.2
c0.1-0.1,0.1-0.2,0.3-0.2c0.3,0,1.2,0.3,1.8,0.6l0-3.1c0-0.2,0.2-0.4,0.4-0.4h2.9c0.2,0,0.4,0.2,0.4,0.4V22
c0.5-0.1,1.1-0.2,1.6-0.2c3.1,0,6.4,1.9,6.4,5.8c0.2,0,0.5,0,0.8,0.1c0.2,0,0.3,0.1,0.3,0.7c0,0.8-0.1,2-0.1,2.5
c0,0.3-0.1,0.4-0.4,0.4c-0.4,0-0.7,0-0.9-0.1c-0.5,1.8-2.2,2.9-3.9,2.9c-0.9,0-3.2-0.5-3.2-3c0-1.6,1-3.4,3.8-3.4
c-0.2-1.9-1.6-2.6-2.9-2.6c-0.5,0-1,0.1-1.5,0.3l0,8.3c0,0.4-0.2,0.6-0.5,0.6H125.7z M133.2,30.3c-0.6,0-1.2,0.2-1.2,0.6
c0,0.4,0.3,0.6,0.6,0.6c0.4,0,0.9-0.5,1-1.2C133.4,30.3,133.3,30.3,133.2,30.3z M155.8,30.1c0,1-4.5,2.6-5.7,2.6
c-0.3,0-0.5-0.1-0.7-0.3c-1.4-2.3-2-4.3-2-6c0-4.2,3.6-6,7.1-6c5,0,8,3.2,8,7.2c0,2.3-1,4.4-3,6.4c-0.2,0.2-0.4,0.3-0.6,0.3
c-0.1,0-0.3-0.1-0.4-0.1c-2.8-1.4-2.8-1.4-2.8-1.6c0-0.1,0.1-0.2,0.2-0.3c1.5-1.4,2.4-3.1,2.4-4.6c0-1.4-1-3.7-3.9-3.7
c-2,0-3.5,1.1-3.5,2.7c0,0.1,0.1,1.6,0.7,1.6c0,0,0.1,0,0.1,0c0.6-0.3,1.9-1.1,2.4-1.4c0.1-0.1,0.3-0.1,0.3-0.1
c0.1,0,0.2,0.1,0.3,0.2C154.8,27,155.8,29.9,155.8,30.1z M179.3,31.2c0,2-1.7,3-3.5,3c-1.8,0-4.1-1-4.1-3.8c0-2.4,1.7-4.1,3.9-4.8
v-1.2l-2.4,0.1c-0.2,0-0.3-0.1-0.3-0.3l-0.1-2.6v0c0-0.2,0.2-0.3,0.3-0.3l2.4-0.1c0-0.4,0-0.8,0-0.9c0-0.2,0-0.4,0.4-0.4h2.9
c0.3,0,0.4,0.3,0.4,0.5v0.7l1.1,0h0c0.2,0,0.3,0.2,0.3,0.3l0,2.6c0,0.2-0.1,0.3-0.3,0.4l-1.2,0c0,0.3,0,0.6,0,0.8
c4.1,0.4,6.7,3.3,6.7,6.3c0,1.9-1.1,3.5-1.5,3.5c-0.3,0-2.6-1.1-2.7-1.2c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1,0-0.1,0.1-0.2
c0.3-0.4,0.4-1.1,0.4-1.8c0-2-1.6-2.6-2.8-2.8L179.3,31.2L179.3,31.2z M175.6,28.9c-0.6,0.2-1.1,0.6-1.1,1.3c0,0.6,0.5,0.6,0.5,0.6
c0.3,0,0.5-0.2,0.5-0.6V28.9z M184.9,26.7c-0.1,0.1-0.2,0.1-0.2,0.1c-0.1,0-0.2-0.1-0.3-0.1c-0.6-0.7-2-2.4-2.6-3.1
c0-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.2,0.1-0.2l1.7-1.4c0.1-0.1,0.1-0.1,0.2-0.1c0.4,0,3.2,2.5,3.2,3c0,0.1,0,0.2-0.1,0.3L184.9,26.7z
 M206.5,20.6c0.1,0.1,0.3,0.2,0.3,0.4c0,0.1-0.1,0.2-0.1,0.4c-1.4,1.8-3.4,5-3.4,5.5c0,0.1,0,0.2,0.2,0.3c1.7,1.7,4.2,4.5,4.2,5.2
c0,0.3-0.2,0.5-2.3,2.2c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.3,0-0.4-0.1c0,0-3.9-3.9-5.4-5.5c-0.5-0.5-0.6-0.8-0.6-1.2
c0-1.3,1.8-5.4,4.8-8.7c0.1-0.1,0.2-0.1,0.4-0.1c0.1,0,0.2,0,0.3,0.1L206.5,20.6z M230.6,24.5c0.1,1,0.1,2.1,0.1,3.1
c0.4,0.6,0.6,1.4,0.6,2.3c0,1.2-0.4,2.7-1.4,4.3c-0.2,0.4-0.4,0.4-2.7,0.4c-0.7,0-0.7-0.1-0.7-0.2c0-0.1,0-0.1,0.1-0.2
c0.3-0.7,0.5-1.3,0.6-1.8c-0.4,0.1-0.8,0.1-1.1,0.1c-1.7,0-3.8-0.8-3.8-3.4c0-2.6,2.1-3.9,4.2-3.9h0.1l-0.1-1l-5.7-0.2
c-0.2,0-0.3-0.1-0.3-0.3l0.1-2.9c0-0.2,0.2-0.3,0.4-0.3l5.3,0.2l-0.1-1.5v-0.1c0-0.2,0.1-0.3,0.3-0.3l3-0.2h0
c0.4,0,0.4,0.2,0.7,2.2l4.1,0.2c0.2,0,0.3,0.2,0.3,0.4l-0.1,2.9c0,0.2-0.2,0.3-0.4,0.3L230.6,24.5z M226.2,28.2
c-0.4,0-0.8,0.3-0.8,0.7c0,0.3,0.2,0.8,0.7,0.8c0.6,0,0.7-0.6,0.7-1.2C226.6,28.3,226.4,28.2,226.2,28.2z M245.7,27.1
c-0.2-0.1-0.3-0.2-0.3-0.5c0-1.2,0.7-3.9,0.7-4.2c0.1-0.2,0.2-0.4,0.5-0.4c0,0,0.1,0,0.1,0l3.2,0.6c0.2,0,0.4,0.2,0.4,0.5
c0,0.1,0,0.1,0,0.2l-0.5,3.9c0,0.2-0.3,0.5-0.6,0.5c-0.1,0-0.1,0-0.1,0L245.7,27.1z M252.3,33.7c-0.2-0.1-0.2-0.2-0.2-0.3
s0-0.3,0.1-0.4c0.7-1.2,0.9-2.6,0.9-4.1c0-2.7-0.8-5.5-1.5-7.7c0-0.1-0.1-0.2-0.1-0.3c0-0.2,0.1-0.4,0.3-0.4l3.2-0.8
c0.1,0,0.2,0,0.3,0c0.4,0,0.5,0.2,0.5,0.4c1,2.4,1.9,5.4,1.9,8.3c0,2.2-0.5,4.4-1.8,6.1c-0.2,0.2-0.3,0.3-0.6,0.3
c-0.1,0-0.3,0-0.4-0.1L252.3,33.7z M269.4,33.7c-0.1,0-0.1,0-0.2,0c-0.2,0-0.3-0.1-0.3-0.4l-0.4-6.5l-0.8-0.1
c-0.3,0-0.4-0.2-0.4-0.5c0-0.1,0-0.1,0-0.2l2.1-6.4c0.1-0.2,0.2-0.3,0.4-0.3c0.1,0,0.1,0,0.2,0l2.7,0.9c0.2,0.1,0.3,0.2,0.3,0.4
c0,0.1,0,0.1,0,0.2l-1.6,4.8l0.4,0c0.3,0,0.4,0.2,0.4,0.4l0.5,6.3v0.1c0,0.3-0.2,0.6-0.5,0.6L269.4,33.7z M283.1,34.8l-8.9-0.2
c-0.5,0-0.9-0.3-0.9-0.8l-0.2-13.9c0-0.5,0.4-0.8,0.8-0.8l7.7-0.5h0.2c1.6,0,2.4,1,2.4,2.8v0.1l-0.2,12.2
C284.1,34.4,283.7,34.8,283.1,34.8L283.1,34.8z M281,22.9c0-0.6-0.3-0.8-0.7-0.8h-0.1l-4.3,0.2l0.1,9.7l4.8,0.1L281,22.9z
 M277.2,31.3c-0.3,0-0.4-0.1-0.4-0.4l-0.1-3v0c0-0.3,0.2-0.4,0.4-0.4h0.1v-1.2l-0.4,0c-0.2,0-0.3-0.1-0.3-0.3l0-1.6
c0-0.3,0.1-0.3,0.3-0.3l0.5,0l0-1c0-0.2,0.1-0.3,0.3-0.3l1.7,0.1c0.2,0,0.3,0.1,0.3,0.3l0,0.7l0.5,0h0c0.2,0,0.3,0.2,0.3,0.4l0,1.5
c0,0.3-0.1,0.4-0.3,0.4l-0.6,0l0,1.2c0.5,0.1,0.8,0.5,0.8,1v0.1l-0.1,2.3c0,0.3-0.3,0.5-0.5,0.5L277.2,31.3z M278.7,29.2
c0-0.2-0.1-0.3-0.3-0.3h0l-0.6,0.1v1.2l0.8,0L278.7,29.2z M301.2,31.4l0.1,1l1-0.1h0.1c0.1,0,0.2,0.1,0.2,0.2l-0.1,1.7
c0,0.3-0.2,0.4-0.4,0.5l-4.4,0.4h-0.1c-0.3,0-0.5-0.2-0.5-0.4l-0.2-1.7V33c0-0.2,0.1-0.3,0.3-0.3l0.8-0.1l-0.1-1.1l-1.6,0.1
c-0.1,0.9-0.3,1.8-0.6,2.5c-0.2,0.3-0.5,0.5-0.9,0.5c-0.1,0-0.3,0-0.4-0.1l-2.4-0.8c-0.2-0.1-0.3-0.2-0.3-0.4c0-0.1,0-0.1,0-0.2
c0.6-1.3,1-3.7,1-4.4l0.1-7.6c0-1.6,1-2.4,2-2.4l10.7-0.3h0.1c1.4,0,2.3,0.6,2.3,2.3l0.1,3.2v0c0,0.6-0.4,1-1,1L296.6,25l-0.1,3.9
c0,0.1,0,0.3,0,0.5l2-0.1l-0.1-1.1h-0.9c-0.2,0-0.3-0.1-0.3-0.3l0-1.4c0-0.2,0.1-0.3,0.2-0.3h0.8l0-0.3v0c0-0.2,0.1-0.3,0.3-0.3
l2.3-0.1c0.2,0,0.3,0.1,0.3,0.3l0,0.5h1.9l0-0.5c0-0.3,0.2-0.3,0.4-0.3l2.7,0.1c0.2,0,0.3,0.1,0.3,0.3v0l0,0.4h1
c0.2,0,0.3,0.1,0.3,0.3l0,1.4c0,0.2-0.1,0.3-0.3,0.3h-1.1l-0.1,0.8l1.7-0.1h0.1c0.2,0,0.3,0.1,0.4,0.3l0.1,1.5v0.1
c0,0.2-0.1,0.3-0.3,0.3L301.2,31.4z M304,21.8c0-0.3-0.2-0.5-0.5-0.5h-0.1l-6.3,0.2c-0.4,0-0.5,0.3-0.5,0.6l0,0.9l7.5-0.2L304,21.8
z M303.1,28.1l-1.7,0l0.1,1.2l1.5-0.1L303.1,28.1z M307.6,34.9c-0.1,0.2-0.4,0.3-0.6,0.3c-0.2,0-0.4,0-0.6-0.1l-3.3-1.6
c-0.1-0.1-0.2-0.2-0.2-0.3c0-0.1,0-0.2,0.1-0.3l1-1.5c0.1-0.1,0.2-0.2,0.3-0.2c0.1,0,0.1,0,0.2,0.1l1.3,0.5l0.2-0.3
c0.1-0.1,0.2-0.2,0.3-0.2c0.1,0,0.1,0,0.2,0.1L308,32c0.1,0.1,0.2,0.2,0.2,0.3c0,0.1,0,0.1-0.1,0.2l-0.2,0.3l0.4,0.2
c0.2,0.1,0.2,0.2,0.2,0.3c0,0.1-0.1,0.2-0.1,0.3L307.6,34.9z`;

const attrs = {
  width: 431,
  height: 131,
};

const MASK_ID = "title__credit-mask";

export default function StoryTitle() {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLDivElement>(
    {}
  );

  return (
    <Wrapper ref={targetRef}>
      <Svg viewBox={`0 0 ${attrs.width} ${attrs.height}`}>
        <mask id={MASK_ID}>
          <PolyLine
            isIntersected={isIntersected}
            points={`30,88 30,83 28,78 24,77 17,79 10,87 6,97 4,108 4,116 9,122 15,127 25,127 36,125 48,118 59,110 
			71,94 76,79 81,65 84,57 78,58 76,65 76,68 82,75 87,80 93,82 100,84 101,87 97,92 96,97 95,105 98,112 101,116 108,116 116,116 
			122,113 130,108 135,102 138,96 146,92 152,90 159,85 162,76 165,67 161,62 156,62 151,65 147,71 146,79 143,87 145,102 148,110 
			153,112 160,115 172,114 184,108 195,100 203,90 205,84`}
          />
          <PolyLine
            isIntersected={isIntersected}
            points={`241,65 236,61 231,58 224,61 218,67 213,75 209,84 208,92 208,98 208,104 212,108 218,109 227,105 
            233,100 241,90 248,79 255,62 262,46 267,30 270,15 268,8 263,8 258,11 255,16 248,41 245,57 241,72 241,77 244,98 248,107 
            256,109 264,107 276,100 286,88 294,77 299,57 295,84 299,95 306,101 315,102 323,96 331,90 343,75 350,53 354,35 361,4 358,29 
            334,35 388,25 356,33 346,76 348,87 354,92 362,96 372,94 383,87 393,80 403,69 406,63`}
          />
          <PolyLine isIntersected={isIntersected} points={`423,88 427,81`} />
        </mask>
        <Line d={linePath} mask={`url(#${MASK_ID})`} />
        <Label d={labelPath} isIntersected={isIntersected} />
        <g>
          <Word
            isIntersected={isIntersected}
            d={`M37.9,69.4c2.9,0.8,5.9,1.7,8.8,2.5c1.1,0.3,1.6,1.7,0.9,2.6c-1.6,2.2-3.4,4.5-5.2,6.8c0.1,3,0.1,6-0.1,9
            c-0.1,1-1,1.8-2,1.5c-2.6-0.6-5.3-1.4-8.1-2.3c-2.7,1.1-5.3,2.2-7.7,3.1c-1,0.4-2.1-0.3-2.2-1.4c-0.3-3-0.6-6.1-0.7-9.1
            c-1.9-2.2-3.9-4.4-5.7-6.5c-0.8-0.9-0.4-2.3,0.7-2.7c2.9-1,5.8-2.1,8.6-3.1c1.6-2.5,3.2-5.1,4.8-7.6c0.6-1,2.1-1.1,2.8-0.1
            C34.3,64.6,36.1,67.1,37.9,69.4z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M74.9,94c-0.2-0.2-0.4-0.4-0.4-0.7c0-0.3,0.2-0.7,0.8-1.1c9.6-6,19.4-17.8,19.4-19.1c0-0.4-0.3-0.7-1-0.7
            L88.1,72c-6.3,2.8-10.2,4-11.3,4c-0.5,0-0.9-0.2-1.2-0.7l-4.3-6.8c-0.2-0.3-0.3-0.6-0.3-0.8c0-0.4,0.3-0.8,0.8-0.9
            c5.2-1.8,10.5-5.2,14-7.7c0.2-0.2,0.5-0.3,0.9-0.3c0.7,0,1,0.6,2.9,3.7l15.6,1.2c2,0.2,4.7,2,4.7,5c0,0.3,0,0.6-0.1,0.9
            C106.9,85.6,83.4,99.6,81,99.6c-0.3,0-0.6-0.2-1-0.5L74.9,94z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M129.9,61.6c0-0.7,0.2-1.2,1-1.2h9.9c0.6,0,1.5,0.4,1.5,1.1l-0.4,20.5v0.2c0,0.4,0.1,0.6,0.3,0.6
            c0.9,0,11.4-2.5,12.1-2.7c0.2-0.1,0.5-0.1,0.7-0.1c0.5,0,0.8,0.1,1.1,0.8c0.8,1.3,2.6,4.5,3.7,6.6c0.1,0.3,0.2,0.6,0.2,0.8
            c0,3.3-22.8,9.8-28.3,9.8c-1.3,0-1.7-0.7-1.7-1.8V61.6z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M177.3,82.9c-0.4,0.2-0.8,0.3-1,0.3c-0.5,0-0.6-0.3-0.9-0.7c-5.5-8.3-5.9-9.2-5.9-9.7c0-0.3,0.1-0.5,0.4-0.6
            l7-3c0.3-0.2,0.8-0.2,1.1-0.2c0.4,0,0.7,0.1,1.1,0.3c1.8,1.6,7.2,6.8,7.2,9c0,0.4-0.2,0.8-0.7,1L177.3,82.9z M212.7,83.5
            c0,0.2,0.1,0.2,0.1,0.4c0,0.3-0.2,0.7-0.6,0.9c-9,7.1-19.1,12.4-29,15.3c-0.2,0.1-0.3,0.1-0.5,0.1c-0.4,0-0.7-0.2-0.9-0.5
            l-4.8-8.4c-0.1-0.1-0.2-0.3-0.2-0.4c0-0.4,0.2-0.7,0.6-0.9c7.8-3,23.4-10.3,29.6-14.2c0.1,0,0.3-0.1,0.5-0.1
            c0.3,0,0.7,0.2,0.9,0.6L212.7,83.5z M191,71.9c-0.5,0.5-0.8,0.6-1,0.6c-0.3,0-0.6-0.2-0.9-0.4c-7.8-6.6-8.4-7.3-8.4-8
            c0-0.2,0.1-0.4,0.2-0.5l5.7-4.7c0.4-0.3,0.9-0.7,1.4-0.7c1.1,0,10.1,4.8,10.1,7.1c0,0.2-0.2,0.6-0.5,0.8L191,71.9z M202,62.5h-0.3
            c-0.7,0-1-0.2-1.2-0.8l-1-3.9c0-0.2-0.1-0.4-0.1-0.6c0-0.6,0.4-0.8,1-0.9l3.7-0.4h0.2c0.7,0,1.2,0.6,1.3,1.2l0.9,3.8
            c0,0.2,0,0.3,0,0.5c0,0.5-0.3,0.8-1.2,0.9L202,62.5z M211.7,62.9c-0.2,0.2-0.5,0.3-0.7,0.3c-0.3,0-0.7-0.2-0.9-0.4l-3.2-3.5
            c-0.2-0.2-0.3-0.5-0.3-0.7c0-0.4,0.3-0.6,0.5-0.8l2.6-2c0.2-0.2,0.5-0.2,0.8-0.2c0.4,0,0.8,0.2,1.1,0.5l2.9,2.6l0.1,0.1
            c0.3,0.2,0.4,0.5,0.4,0.8c0,0.3-0.2,0.6-0.5,0.9L211.7,62.9z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M228.1,84.3c-0.2,0-0.3,0-0.5,0c-0.8,0-0.9-0.4-1.1-0.9c-2.2-7.7-2.2-7.8-2.2-8c0-0.6,0.2-1,0.7-1l5.9-0.7
            c0.1,0,0.3,0,0.5,0c0.4,0,0.9,0.2,1.3,0.7c1.3,2,3.3,5.9,3.3,7.7c0,0.6-0.2,1.2-0.9,1.2L228.1,84.3z M234.3,97.5
            c-0.4-0.2-0.7-0.6-0.7-1c0-0.2,0-0.4,0.2-0.5c3.5-4.2,7.2-10.1,9.9-15.6l-5.2,0.9c-0.2,0.1-0.4,0.1-0.5,0.1c-0.7,0-0.9-0.3-1-0.8
            c-1.8-5.1-2.4-7.8-2.4-8c0-0.5,0.2-0.9,0.7-1l5.7-0.8c0.1,0,0.3,0,0.4,0c0.5,0,1,0.1,1.3,0.6c0.8,1.2,2.2,3.5,3,5.5
            c0.8-1.7,1.5-3.3,2-4.7c0.2-0.3,0.6-0.6,1-0.6c0.1,0,0.3,0.1,0.4,0.1l6.8,3c0.4,0.2,0.5,0.5,0.5,0.9c0,1.6-5.4,15.7-14.9,23.8
            c-0.2,0.4-0.5,0.5-0.9,0.5c-0.1,0-0.3,0-0.5-0.1L234.3,97.5z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M281.4,100.2c-0.5,0-1-0.4-1-0.9V57.1c0-0.6,0.5-1,1-1h9.9c0.5,0,1,0.4,1,1v17.2l2.6-3.6
            c0.4-0.5,0.8-0.7,1.3-0.7c1.5,0,9.5,2,13.8,4.3c0.5,0.3,0.8,0.7,0.8,1.1c0,0.4-0.2,0.8-5.7,9.7c-0.2,0.4-0.6,0.5-1,0.5
            s-0.7-0.1-1-0.3c-2.5-1.6-7.7-4.3-11-5.9v19.9c0,0.5-0.4,0.9-1,0.9H281.4z`}
          />
          <Word
            isIntersected={isIntersected}
            d={`M355.1,69.4c2.9,0.8,5.9,1.7,8.8,2.5c1.1,0.3,1.6,1.7,0.9,2.6c-1.6,2.2-3.4,4.5-5.2,6.8c0.1,3,0.1,6-0.1,9
            c-0.1,1-1,1.8-2,1.5c-2.6-0.6-5.3-1.4-8.1-2.3c-2.7,1.1-5.3,2.2-7.7,3.1c-1,0.4-2.1-0.3-2.2-1.4c-0.3-3-0.6-6.1-0.7-9.1
            c-1.9-2.2-3.9-4.4-5.7-6.5c-0.8-0.9-0.4-2.3,0.7-2.7c2.9-1,5.8-2.1,8.6-3.1c1.6-2.5,3.2-5.1,4.8-7.6c0.6-1,2.1-1.1,2.8-0.1
            C351.5,64.6,353.3,67.1,355.1,69.4z`}
          />
        </g>
      </Svg>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Svg = styled.svg`
  width: 420px;
  overflow: visible;

  ${media.smallDown} {
    width: 280px;
  }
`;

const Line = styled.path`
  fill: #e0b641;
`;

const popin = keyframes`
  from {
    opacity: 0;
  }
  50%,
  to {
    opacity: 1;
  }

  from {
    transform: translateY(20px);
  }
  50% {
    transform: translateY(-8px);
  }
  to {
    transform: translateY(0);
  }
`;

const Label = styled.path<{ isIntersected: boolean }>`
  fill: #55291e;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${popin} 0.4s ease-out 0s both;
    `}
`;

const Word = styled.path<{ isIntersected: boolean }>`
  fill: #55291e;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${popin} 0.4s ease-out 0.1s both;

      &:nth-of-type(2) {
        animation-delay: 0.15s;
      }
      &:nth-of-type(3) {
        animation-delay: 0.2s;
      }
      &:nth-of-type(4) {
        animation-delay: 0.25s;
      }
      &:nth-of-type(5) {
        animation-delay: 0.3s;
      }
      &:nth-of-type(6) {
        animation-delay: 0.35s;
      }
      &:nth-of-type(7) {
        animation-delay: 0.4s;
      }
      &:nth-of-type(8) {
        animation-delay: 0.45s;
      }
    `}
`;

const drawLine = (length: number) => keyframes`
  from {
    opacity: 0;
  }
  10%,
  to {
    opacity: 1;
  }

  from {
    stroke-dasharray: 0 ${length};
  }
  to {
    stroke-dasharray: ${length} ${length};
  }
`;

const PolyLine = styled.polyline<{ isIntersected: boolean }>`
  fill: none;
  stroke-width: 9;
  stroke: #fff;
  stroke-linejoin: round;
  stroke-linecap: round;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      &:nth-of-type(1) {
        animation: ${drawLine(491)} 0.3s ease-in-out 0s both;
      }
      &:nth-of-type(2) {
        animation: ${drawLine(825)} 0.4s ease-in-out 0.25s both;
      }
      &:nth-of-type(3) {
        animation: ${drawLine(8)} 0.1s ease-in-out 0.6s both;
      }
    `}
`;
